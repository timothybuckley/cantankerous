// app/page.js

import ImageGallery from './components/ImageGallery';
import { v2 as cloudinary } from 'cloudinary';

export const revalidate = 60;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Debugging logs
console.log('Cloudinary Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('Cloudinary API Key is set:', !!process.env.CLOUDINARY_API_KEY);
console.log('Cloudinary API Secret is set:', !!process.env.CLOUDINARY_API_SECRET);

export default async function Page() {
  try {
    const { resources } = await cloudinary.search
      .expression('folder:hibiscus')
      .sort_by('public_id', 'desc')
      .max_results(500)
      .execute();

    const images = resources.map((resource) => ({
      id: resource.asset_id,
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
    }));

    console.log('Images fetched:', images.length);

    return <ImageGallery images={images} />;
  } catch (error) {
    console.error('Error fetching images:', error);
    return <div>Failed to load images.</div>;
  }
}