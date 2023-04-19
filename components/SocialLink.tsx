import Image from 'next/image';

interface SocialLinkProps {
    link: string;
    service: string;
    quote: string;
}
export default function SocialLink({ link, service, quote, }: SocialLinkProps) {
    return (
        <div className="pt-4">
            <a href={link} target="_blank" className="flex flex-row ">
                <Image
                    src={`/link_icons/${service}.svg`}
                    alt={`${service} Icon`}
                    width={25}
                    height={25}
                />
                <p className="pl-4">"{quote}"</p>
            </a>
        </div>
    )
}
