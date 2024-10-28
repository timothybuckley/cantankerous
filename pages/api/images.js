// pages/api/images.js

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  try {
    const { resources } = await cloudinary.search
      .expression('folder:hibiscus')
      .sort_by('public_id', 'desc')
      .max_results(500)
      .execute();

    const images = resources.map((resource) => {
      return {
        id: resource.asset_id,
        url: resource.secure_url,
        width: resource.width,
        height: resource.height,
      };
    });

    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
}
