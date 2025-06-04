import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

interface UploadedImage {
  id: string
  url: string
  name: string
  date: string
  size: string
}

// Add dummy data
const dummyLibraryImages: UploadedImage[] = [
  {
    id: '1',
    url: '/products/chanderlier.jpg',
    name: 'Crystal Chandelier',
    date: '2025-04-26',
    size: '2.4 MB'
  },
  {
    id: '2',
    url: '/products/chanderlier.jpg',
    name: 'Modern Pendant',
    date: '2025-04-25',
    size: '1.8 MB'
  },
  {
    id: '3',
    url: '/products/pendant.jpg',
    name: 'Luxury Light',
    date: '2025-04-24',
    size: '3.1 MB'
  },
  // Add more dummy images here
]

interface ImageLibraryProps {
  onSelect: (images: UploadedImage[]) => void
  onClose: () => void
}

export function ImageLibrary({ onSelect, onClose }: ImageLibraryProps) {
  const [libraryImages, setLibraryImages] = useState<UploadedImage[]>([])

  useEffect(() => {
    // Simulate fetching images from backend
    setLibraryImages(dummyLibraryImages)
  }, [])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-700">Media Library</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {libraryImages.map((image) => (
            <div 
              key={image.id} 
              className="relative group aspect-square rounded-lg border border-gray-200 hover:border-[#4C8EDA] transition-colors"
            >
              <Image
                src={image.url}
                alt={image.name}
                fill
                className="object-cover rounded-lg"
                onError={(e) => {
                  // Fallback to placeholder image
                  e.currentTarget.src = '/placeholder-image.jpg'
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <button 
                  onClick={() => onSelect([image])}
                  className="px-3 py-1.5 bg-white rounded-lg text-sm hover:bg-gray-50"
                >
                  Select
                </button>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/60 to-transparent text-white text-sm rounded-b-lg">
                <p className="truncate">{image.name}</p>
                <p className="text-xs opacity-75">{image.size}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}