export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <section className="animate-page-enter h-full">
            {children}
        </section>
    );
}
