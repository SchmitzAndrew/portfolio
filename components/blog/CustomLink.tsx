import Link from "next/link";

interface CustomLinkProps {
    href: string;
    text: string;
}
export default function CustomLink({ href, text }: CustomLinkProps) {
    const isInternalLink = href && href.startsWith('/');

    if (isInternalLink) {
        return (
            <Link href={href}>
                <a>{text}</a>
            </Link>
        );
    }

    return (
        <a target="_blank" rel="noopener noreferrer" href={href}>
            {text}
        </a>
    );
};
