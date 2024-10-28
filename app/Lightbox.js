// app/Lightbox.js
'use client';

import Image from 'next/image';

export default function Lightbox({ src, closeLightbox }) {
    return (
      <div className="lightbox-overlay" onClick={closeLightbox}>
<div
  className="lightbox-content"
  onClick={(e) => e.stopPropagation()}
  style={{
    position: 'relative', // Ensure this is present
    width: '80vw',
    height: '80vh',
  }}
>
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            &times;
          </button>
          <Image
            src={src}
            alt="Enlarged Image"
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 800px) 100vw, 800px"
          />
        </div>
      </div>
    );
  }
  