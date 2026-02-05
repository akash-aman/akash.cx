import "styles/themes.scss";
import "styles/fonts.scss";
import "styles/globals.scss";
import "styles/typography.scss";
import "styles/tailwind.css";
import "styles/styles.scss";
import "styles/prism.scss";

import ApplyTheme from "hooks/theme";
import Navigation from "components/blocks/NavMenu";
import { RegisterPWA } from "./register-pwa";
import { GoogleAnalytics } from "@next/third-parties/google";
import { metadata, viewport } from "config/site";
export { metadata, viewport };

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
                <link rel="stylesheet" href="https://use.typekit.net/kja6uqf.css"></link>
            </head>
            <body className="scrollbar bg-(--bg-secondary) h-svh">
                <ApplyTheme />
                <Navigation className="fixed z-10 w-full bottom-0 md:w-24 md:h-full md:left-0" />
                <div className="md:ml-24 md:shadow-(--content-area-fade) grid min-h-full px-6 py-12 sm:px-12 sm:py-14 md:px-12 lg:px-16 md:py-20">{children}</div>
                <RegisterPWA />
                <GoogleAnalytics gaId="G-K5LQXQ8CTG" />
            </body>
        </html>
    );
}
