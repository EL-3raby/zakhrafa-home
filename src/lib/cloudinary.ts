import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary SDK with environment credentials
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryUploadResult {
  url: string;
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

/**
 * Upload a buffer directly to Cloudinary with smart compression
 */
export async function uploadBufferToCloudinary(
  buffer: Buffer,
  folder = 'zakhrafa/products',
  tags: string[] = ['zakhrafa', 'product'],
  resourceType: 'image' | 'video' | 'auto' = 'image'
): Promise<CloudinaryUploadResult> {
  const isCategory = folder.includes('categories');
  const isVideo = resourceType === 'video';

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: Record<string, any> = {
      folder,
      tags: isCategory ? ['zakhrafa', 'category'] : isVideo ? ['zakhrafa', 'hero_video'] : tags,
      resource_type: resourceType,
    };

    if (isCategory) {
      // High-efficiency smart compression specifically optimized for category tiles:
      // - Max width/height 1200px (prevents 10MB raw photo bloat while preserving HD sharpness)
      // - quality: 'auto:good' (intelligent perceptual compression, cutting size by 70%+)
      // - fetch_format: 'auto' (serves modern WebP or AVIF)
      options.transformation = [
        {
          width: 1200,
          height: 1200,
          crop: 'limit',
          quality: 'auto:good',
          fetch_format: 'auto',
        },
      ];
    } else {
      // General product image optimization (max 1800px)
      options.transformation = [
        {
          width: 1800,
          height: 1800,
          crop: 'limit',
          quality: 'auto:good',
          fetch_format: 'auto',
        },
      ];
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error('Upload to Cloudinary failed'));
        }

        // Ensure delivery URL contains f_auto,q_auto for maximum browser compression & performance
        let optimizedUrl = result.secure_url;
        if (optimizedUrl.includes('/image/upload/') && !optimizedUrl.includes('f_auto,q_auto')) {
          optimizedUrl = optimizedUrl.replace('/image/upload/', '/image/upload/f_auto,q_auto/');
        }

        resolve({
          ...result,
          url: optimizedUrl,
          secure_url: optimizedUrl,
        } as CloudinaryUploadResult);
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Extracts public_id from a Cloudinary URL safely
 */
export function getPublicIdFromCloudinaryUrl(url: string): string | null {
  if (!url || !url.includes('cloudinary.com')) return null;

  try {
    const parts = url.split('/upload/');
    if (parts.length < 2) return null;

    let pathAfterUpload = parts[1];

    // Remove transformations / version e.g. "v1742533000/zakhrafa/products/sample.jpg"
    const versionMatch = pathAfterUpload.match(/(?:^|\/)v\d+\/(.+)$/);
    if (versionMatch) {
      pathAfterUpload = versionMatch[1];
    } else if (/^v\d+\//.test(pathAfterUpload)) {
      pathAfterUpload = pathAfterUpload.replace(/^v\d+\//, '');
    }

    // Strip off file extension (.jpg, .png, .webp)
    const lastDotIndex = pathAfterUpload.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      pathAfterUpload = pathAfterUpload.substring(0, lastDotIndex);
    }

    return decodeURIComponent(pathAfterUpload);
  } catch (error) {
    console.error('Failed to extract public_id from Cloudinary URL:', error);
    return null;
  }
}

/**
 * Delete an image from Cloudinary by its public_id or image URL
 */
export async function deleteFromCloudinary(
  identifier: string,
  resourceType?: 'image' | 'video'
): Promise<boolean> {
  try {
    if (!identifier) return false;

    // If identifier is a full URL, extract the public_id
    let publicId = identifier;
    const isVideoUrl = identifier.includes('/video/upload/');
    if (identifier.startsWith('http://') || identifier.startsWith('https://')) {
      const extracted = getPublicIdFromCloudinaryUrl(identifier);
      if (!extracted) {
        // Not a Cloudinary URL (e.g. Unsplash placeholder), resolve safely
        return true;
      }
      publicId = extracted;
    }

    const type = resourceType || (isVideoUrl ? 'video' : 'image');
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: type });
    return result.result === 'ok' || result.result === 'not found';
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return false;
  }
}

export default cloudinary;
