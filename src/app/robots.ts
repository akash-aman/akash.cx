import { MetadataRoute } from 'next'
import { baseURL } from '@/config/constant'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${baseURL}/sitemap.xml`,
    }
}
