import { NextRequest, NextResponse } from 'next/server';
import { uploadBufferToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

export const runtime = 'nodejs';

/**
 * POST /api/upload
 * Accepts multipart/form-data with a "file" field
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'zakhrafa/products';

    if (!file) {
      return NextResponse.json(
        { error: 'لم يتم إرسال أي ملف للرفع' },
        { status: 400 }
      );
    }

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    // Verify file type is an image or video
    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: 'يسمح فقط برفع ملفات الصور والفيديو (MP4, WebM, MOV)' },
        { status: 400 }
      );
    }

    // Check size limit (e.g. 50MB for video, 10MB for image)
    const maxVideoSize = 50 * 1024 * 1024;
    const maxImageSize = 12 * 1024 * 1024;
    if (isVideo && file.size > maxVideoSize) {
      return NextResponse.json(
        { error: 'حجم الفيديو كبير جداً. الحد الأقصى المسموح به هو 50 ميجابايت' },
        { status: 400 }
      );
    }
    if (isImage && file.size > maxImageSize) {
      return NextResponse.json(
        { error: 'حجم الصورة كبير جداً. الحد الأقصى المسموح به هو 12 ميجابايت' },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary with appropriate resource_type
    const resourceType = isVideo ? 'video' : 'image';
    const result = await uploadBufferToCloudinary(
      buffer,
      folder,
      isVideo ? ['zakhrafa', 'hero_video'] : ['zakhrafa', 'product'],
      resourceType
    );

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      resource_type: resourceType,
      width: result.width,
      height: result.height,
    });
  } catch (error: unknown) {
    console.error('Cloudinary upload error:', error);
    const errorMessage = error instanceof Error ? error.message : 'فشل رفع الصورة إلى Cloudinary';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/upload
 * Accepts JSON body with:
 * - { url: string } or { public_id: string }
 * - OR { urls: string[] } for batch deletion
 */
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { public_id, url, urls } = body;

    // Batch deletion
    if (Array.isArray(urls) && urls.length > 0) {
      const results = await Promise.all(
        urls.map((u: string) => deleteFromCloudinary(u))
      );
      return NextResponse.json({
        success: true,
        deletedCount: results.filter(Boolean).length,
        message: 'تم حذف الصور بنجاح',
      });
    }

    const target = public_id || url;

    if (!target) {
      return NextResponse.json(
        { error: 'يجب تحديد public_id أو url للصورة المراد حذفها' },
        { status: 400 }
      );
    }

    const success = await deleteFromCloudinary(target);

    if (!success) {
      return NextResponse.json(
        { error: 'فشل حذف الصورة من Cloudinary' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'تم حذف الصورة من Cloudinary بنجاح' });
  } catch (error: unknown) {
    console.error('Cloudinary delete error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء محاولة الحذف' },
      { status: 500 }
    );
  }
}
