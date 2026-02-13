'use client';
import React, { useState } from 'react'
import Image from 'next/image'

interface ProductImagesProps {
  images: string[];
}

export default function ProductImages({ images }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState<string>(images?.[0] || '');

  // Si no hay imágenes, mostrar una imagen por defecto
  if (!images || images.length === 0) {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex justify-center'>
          <Image 
            src={'/images/sample-products/p1-1.jpg'} 
            alt='Imagen de producto' 
            width={500} 
            height={500}
            className='min-h-75 object-cover object-center rounded-lg'
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      {/* Imagen grande - seleccionada */}
      <div className='flex justify-center'>
        <Image 
          src={selectedImage} 
          alt='Imagen de producto seleccionada' 
          width={500} 
          height={500}
          className='min-h-75 object-cover object-center rounded-lg'
          priority
        />
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className='flex gap-2 overflow-x-auto'>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`relative shrink-0 w-20 h-20 rounded-md border-2 transition-all ${
                selectedImage === image
                  ? 'border-black'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Image
                src={image}
                alt={`Miniatura ${index + 1}`}
                width={80}
                height={80}
                className='w-full h-full object-cover rounded-md'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
