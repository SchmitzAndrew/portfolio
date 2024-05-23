import DateFormatter from "./date-formatter";
import { PostTitle } from "./post-title";

import Image from "next/image";

type Props = {
  title: string;
  coverImage: string;
  date: string;

};

export function PostHeader({ title, coverImage, date, }: Props) {
  return (
    <>
      <h1 className="text-3xl md:text-7xl font-bold tracking-tighter leading-tight md:leading-none py-6 text-center  text-gray-50">
        {title}
      </h1>
      
      <div className="mb-8 md:mb-16 sm:mx-0">
        <Image
          src={coverImage}
          alt={`Cover Image for ${title}`}
          className="shadow-sm w-full"
          width={1300}
          height={630}
        />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block mb-6">
          <div className="flex items-center">
            <img src={"/images/profile_picture.png"} className="w-8 h-8 rounded-full mr-4" alt={"Andrew Schmitz"} />
            <p className="text-xl font-bold text-gray-50">Andrew Schmitz</p>
          </div>
        </div>
        <div className="mb-6 text-lg text-gray-50">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
