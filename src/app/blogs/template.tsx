export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <main className="animate-page-enter h-full">
            {children}
        </main>
    );
}
