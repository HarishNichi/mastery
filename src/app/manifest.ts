import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mastery Tracks',
    short_name: 'Mastery Tracks',
    description: 'Your personalized guide to mastering web development.',
    start_url: '/',
    display: 'standalone',
    background_color: '#E6E6FA',
    theme_color: '#4B0082',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}