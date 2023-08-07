import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

export default function PageLayout({ children }: LayoutProps): JSX.Element {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
        </>
    );
}