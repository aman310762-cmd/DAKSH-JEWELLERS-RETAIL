/**
 * Cloudinary image URL builder with optimised transformations
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';

type ImagePreset = 'thumbnail' | 'detail' | 'admin' | 'blur';

const presets: Record<ImagePreset, string> = {
  thumbnail: 'f_auto,q_auto:good,w_500,h_500,c_fill',
  detail: 'f_auto,q_auto:best,w_1200',
  admin: 'f_auto,q_auto:eco,w_120,h_120,c_fill',
  blur: 'f_auto,q_1,w_20',
};

/**
 * Build optimised Cloudinary URL from publicId
 */
export function buildImageUrl(publicId: string, preset: ImagePreset = 'thumbnail'): string {
  if (!CLOUD_NAME || !publicId) return '';

  const transformation = presets[preset];
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformation}/${publicId}`;
}

/**
 * Generate blur placeholder URL for Next.js blurDataURL
 */
export function getBlurUrl(publicId: string): string {
  return buildImageUrl(publicId, 'blur');
}

/**
 * Get the image source — handles both Cloudinary publicId and direct URLs
 */
export function getImageSrc(
  image: { publicId?: string; secureUrl?: string },
  preset: ImagePreset = 'thumbnail'
): string {
  // If we have a Cloudinary publicId and cloud name, use optimised URL
  if (image.publicId && CLOUD_NAME) {
    return buildImageUrl(image.publicId, preset);
  }

  // Fallback to direct URL
  return image.secureUrl || '/images/hero-necklace.jpg';
}
