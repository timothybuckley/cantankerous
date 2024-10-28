// app/components/ImageGallery.jsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ImageGallery.module.css';

export default function ImageGallery({ images }) {
  const [visibleImages, setVisibleImages] = useState(10);
  const [selectedImage, setSelectedImage] = useState(null);

  const loadMore = () => {
    setVisibleImages((prev) => Math.min(prev + 10, images.length));
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className={styles.grid}>
        {images.slice(0, visibleImages).map((image) => (
          <div key={image.id} className={styles.imageWrapper}>
            <Image
              src={image.url}
              alt="Hibiscus"
              fill
              className={styles.image}
              onClick={() => openModal(image)}
            />
          </div>
        ))}
      </div>
      {visibleImages < images.length && (
        <button className={styles.loadMoreButton} onClick={loadMore}>
          Load More
        </button>
      )}
      {selectedImage && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent}>
            <Image
              src={selectedImage.url}
              alt="Hibiscus"
              width={selectedImage.width}
              height={selectedImage.height}
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
