export default function YouTube({ url }: { url: string }) {
    return (
        <div className=" ">
            <iframe
                className="w-full h-96"
                src={url}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}