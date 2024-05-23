import Image from 'next/image';

interface SocialLinkProps {
    link: string;
    service: string;
    quote: string;
    text_style: string;
}
export default function SocialLink({ link, service, quote, text_style }: SocialLinkProps) {
    return (
        <div className="pt-4">
            <a href={link} target="_blank" className="flex flex-row ">
                <Image
                    src={`/images/icons/${service}.svg`}
                    alt={`${service} Icon`}
                    width={25}
                    height={25}
                />
                <p className={text_style}>{quote}</p>
            </a>
        </div>
    )
}
