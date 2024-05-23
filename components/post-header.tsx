import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "./post-title";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  
};

export function PostHeader({ title, coverImage, date,}: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
      <div className="flex items-center">
      <img src={"/images/profile_picture.png"} className="w-12 h-12 rounded-full mr-4" alt={"Andrew Schmitz"} />
      <div className="text-xl font-bold">Andrew Schmitz</div>
    </div>
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
        <div className="flex items-center">
      <img src={"/images/profile_picture.png"} className="w-12 h-12 rounded-full mr-4" alt={"Andrew Schmitz"} />
      <div className="text-xl font-bold">Andrew Schmitz</div>
    </div>
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
