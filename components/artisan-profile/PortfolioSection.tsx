'use client'  
import Image from 'next/image'

type PortfolioItem = {
  url: string
}

type Props = {
  items: string | null | PortfolioItem[]  
}

export default function PortfolioSection({ items }: Props) {
  // Safely normalize to array of URLs
  let portfolioUrls: string[] = []

  // Case 1: If items is an array of PortfolioItem objects
  if (Array.isArray(items)) {
    portfolioUrls = items
      .map(item => (typeof item === 'object' && item.url ? item.url : null))  // Ensure it's an object and has a url
      .filter((url): url is string => typeof url === 'string' && url.trim().startsWith('http'))  // Filter out invalid URLs
  } 
  // Case 2: If items is a string (comma-separated URLs)
  else if (typeof items === 'string' && items.trim()) {
    portfolioUrls = items
      .split(',')  // Split by commas
      .map(url => url.trim())
      .filter(url => url.startsWith('http'))  // Ensure the URL starts with 'http'
  }

  // Else: portfolioUrls will remain as [] if the input is invalid (null, empty, undefined)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-[var(--blue)] mb-6 flex items-center gap-3">
        <span className="text-[var(--orange)] text-3xl">🖼️</span> Portfolio & Past Work
      </h2>

      {portfolioUrls.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-600 text-lg mb-2">No portfolio images yet</p>
          <p className="text-sm text-gray-500">
            Add your best work photos in the edit profile section
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {portfolioUrls.map((url, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Image
                src={url}
                alt={`Portfolio work ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
