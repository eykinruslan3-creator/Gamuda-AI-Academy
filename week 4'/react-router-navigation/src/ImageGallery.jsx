import React, { useState, useEffect } from 'react';

function ImageGallery({ images }) {
  // 1. State management menggunakan useState
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 2. Event handling untuk papan kekunci (Keyboard events)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        // Bergerak ke imej seterusnya
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        // Bergerak ke imej sebelumnya
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === ' ') {
        e.preventDefault(); // Mengelakkan pelayar daripada skrol ke bawah
        setIsFullscreen((prev) => !prev); // Togol mod skrin penuh (Space bar)
      } else if (e.key === 'Escape') {
        setIsFullscreen(false); // Tutup skrin penuh (Escape key)
      }
    };

    // Pasang event listener pada tetingkap
    window.addEventListener('keydown', handleKeyDown);

    // Pembersihan (cleanup) event listener apabila komponen ditutup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [images.length]);

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <h3>Exercise 1: Image Gallery with Keyboard Navigation</h3>

      {/* Paparan Imej Utama */}
      <div 
        style={{
          position: isFullscreen ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          width: isFullscreen ? '100vw' : 'auto',
          height: isFullscreen ? '100vh' : 'auto',
          backgroundColor: isFullscreen ? 'rgba(0,0,0,0.9)' : 'transparent',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '10px'
        }}
      >
        <img 
          src={images[currentIndex]} 
          alt={`Gallery item ${currentIndex}`} 
          style={{ 
            maxWidth: '100%', 
            maxHeight: '450px', 
            objectFit: 'contain',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }} 
        />
      </div>

      <p style={{ color: '#555', marginTop: '10px' }}>
        <small>Gunakan Kekunci Panah Kiri/Kanan, Space (Skrin Penuh), atau Esc (Tutup Skrin Penuh)</small>
      </p>

      {/* Senarai Thumbnail (Klik untuk pilih imej) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
        {images.map((img, index) => (
          <img 
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '80px',
              height: '60px',
              objectFit: 'cover',
              cursor: 'pointer',
              borderRadius: '4px',
              border: currentIndex === index ? '3px solid #007bff' : '1px solid #ccc',
              transition: 'transform 0.2s'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;