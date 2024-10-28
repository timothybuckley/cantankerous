// app/Gallery.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';

export default function Gallery({ images }) {
  const [visibleImages, setVisibleImages] = useState(40);
  const [selectedImage, setSelectedImage] = useState(null);

  const loadMoreImages = () => {
    setVisibleImages((prev) => prev + 40);
  };

  const openLightbox = (src) => {
    console.log('Opening lightbox with src:', src);
    setSelectedImage(src);
  };
  

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-container">
      <div className="image-grid">
        {images.slice(0, visibleImages).map((src, index) => (
          <div key={index} className="image-wrapper">
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              width={300}
              height={200}
              style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
              onClick={() => openLightbox(src)}
            />
          </div>
        ))}
      </div>
      {visibleImages < images.length && (
        <button onClick={loadMoreImages} className="load-more-button">
          View More
        </button>
      )}
      {selectedImage && (
        <Lightbox src={selectedImage} closeLightbox={closeLightbox} />
      )}
    </div>
  );
}