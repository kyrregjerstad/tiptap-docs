import { Metadata } from 'next'
import { FULL_DOMAIN } from '@/utils/constants'
import { isProductionSite } from '@/utils/isProductionSite'

export async function createMetadata({
  title,
  description,
  category,
  ogTitle,
  canonicalPath,
}: {
  title: string
  description: string
  ogTitle: string
  category?: string
  canonicalPath: string
}): Promise<Metadata> {
  return {
    title,
    description,
    robots: isProductionSite() ? 'index, follow' : 'noindex, nofollow',
    openGraph: {
      title,
      description,
      images: [
        {
          url: `${FULL_DOMAIN}/api/og?title=${encodeURIComponent(ogTitle)}&category=${encodeURIComponent(category ?? '')}`,
          width: 1200,
          height: 630,
        },
      ],
      url: process.env.NEXT_PUBLIC_DOMAIN ?? '',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        `${FULL_DOMAIN}/api/og?title=${encodeURIComponent(ogTitle)}&category=${encodeURIComponent(category ?? '')}`,
      ],
    },
    alternates: {
      canonical: canonicalPath,
    },
  }
}
