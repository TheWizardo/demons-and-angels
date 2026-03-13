import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/checkout', '/order-success'],
      }
    ],
    sitemap: 'https://demonsandangels.co.il/sitemap.xml',
  }
}