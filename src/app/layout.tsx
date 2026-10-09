import "styles/themes.scss";
import "styles/fonts.scss";
import "styles/globals.scss";
import "styles/typography.scss";
import "styles/tailwind.css";
import "styles/styles.scss";
import "styles/prism.scss";
import "styles/infra.scss";

import ApplyTheme from "hooks/theme";
import Navigation from "components/blocks/NavMenu";
import { RegisterPWA } from "app/register-pwa";
import Script from "next/script";
import { metadata, viewport } from "config/site";
export { metadata, viewport };

const TYPEKIT_CSS = "https://use.typekit.net/kja6uqf.css";
const GA_ID = "G-K5LQXQ8CTG";

/**
 * This is the Root layout for the every page.
 *
 * @param param0 children - children of the component
 * @returns jsx element.
 */
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <head>
                {/* Typekit CSS @imports p.typekit.net, a ~1.5s render-blocking chain on mobile.
                    Load it asynchronously instead; the fonts swap in when ready. */}
                <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://p.typekit.net" />
                <link rel="preload" href={TYPEKIT_CSS} as="style" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){var l=document.createElement("link");l.rel="stylesheet";l.href="${TYPEKIT_CSS}";document.head.appendChild(l)})()`,
                    }}
                />
                <noscript>
                    <link rel="stylesheet" href={TYPEKIT_CSS} />
                </noscript>
            </head>
            <body className="scrollbar bg-(--bg-secondary) h-svh">
                <ApplyTheme />
                <Navigation className="fixed z-10 w-full bottom-0 md:w-24 md:h-full md:left-0" />
                <div className="md:ml-24 md:shadow-(--content-area-fade) grid grid-cols-1 min-h-full px-6 py-12 sm:px-12 sm:py-14 md:px-12 lg:px-16 md:py-20">{children}</div>
                <RegisterPWA />
                {/* gtag.js (~70KB) loads when the browser is idle after page load; calls made before then queue in dataLayer. */}
                <Script id="ga-init" strategy="afterInteractive">
                    {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
                </Script>
                <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
            </body>
        </html>
    );
}
