import Image from "next/image";

interface FigureProps {
    src: string;
    alt: string;
    caption?: string;
}

export default function Figure({ src, alt, caption }: FigureProps) {
    return (

        <figure className="flex">

            <div className="mx-auto">
                <Image
                    src={src}
                    alt={alt}
                    width={500}
                    height={400}
                    className="rounded-lg mx-auto"
                />
                <figcaption className="text-sm text-gray-700 text-left">
                    {caption}
                </figcaption>
            </div>
        </figure>

    );
}