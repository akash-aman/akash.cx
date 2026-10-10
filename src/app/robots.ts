import { MetadataRoute } from 'next'
import { baseURL } from '@/config/constant'

/**
 * AI crawlers are named explicitly so it is clear they are welcome: both the
 * search/answer bots (which cite pages) and the training crawlers.
 */
const aiCrawlers = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-SearchBot',
    'Claude-User',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Applebot-Extended',
    'CCBot',
    'Bingbot',
]

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/api/',
            },
            {
                userAgent: aiCrawlers,
                allow: '/',
                disallow: '/api/',
            },
        ],
        sitemap: `${baseURL}/sitemap.xml`,
        host: baseURL,
    }
}
