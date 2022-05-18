import React, { useContext } from "react";
import { format } from "date-fns";
import ShareButtons from "./ShareButtons";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import PostTitle from "./PostTitle";
import useFormatNewsItemData from "../../hooks/useFormatNewsItemData";
import ArticleContent from "./ArticleContent";
import { ThemeContext } from "../context/themeContext";
import '@wordpress/block-library/build-style/common.css'
import '@wordpress/block-library/build-style/theme.css'
import '@wordpress/block-library/build-style/style.css'

const Ad = dynamic(() => import("../common/Ad"), { ssr: false });
const PaginationButtons = dynamic(() => import("./PaginationButtons"));
const FeaturedImage = dynamic(() => import("./FeaturedImage"));
const FeaturedVideo = dynamic(() => import("./FeaturedVideo"));

interface PostTemplateOneProps {
  postData: { [any: string]: any };
  hasPagination: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  actualPage: number;
  index?: number;
}

function PostTemplateOne({
  postData,
  hasPagination,
  hasNext,
  hasPrevious,
  actualPage,
  index = 0,
}: PostTemplateOneProps) {
  const [_, __, srcSetImage] = useFormatNewsItemData(5, postData);
  const router = useRouter();

  const featuredVideo = postData.featuredVideo.url;
  const authorName =
    postData.author.node.firstName && postData.author.node.lastName
      ? `${postData.author.node.firstName} ${postData.author.node.lastName}`
      : postData.author.node.name;

  const { theme } = useContext(ThemeContext)

  return (
    <div className="flex flex-col items-center">
      {/* ADV Left */}
      {/* <div className="hidden lg:block w-full relative">
        <div className="w-full sticky top-0 flex flex-col items-center space-y-[10px]">
          <Ad adId="ww_a_sb_1" className="mt-4" index={index} />
          <Ad adId="ww_a_sb_3" className="mt-4" index={index} />
        </div>
      </div> */}
      {/* POST */}
      <main className={`${theme === 'light' ? "bg-white " : ' !text-[#fff] bg-light-black'} noscrollbar sm:mx-auto sm:shadow-post sm:rounded-[3px] w-auto py-8 px-[10px] sm:px-[20px] leading-[1.1] `}>
        <div className="ml-2 sm:ml-0">
          <div className="">
            <PostTitle>{postData.title}</PostTitle>
          </div>
          <div className={`${theme === 'light' ? 'text-[#222]' : 'text-[#fff]'} flex font-quattrocento-sans text-[13px] mt-2`}>
            {authorName && (
              <div className="pl-2">
                By{" "}
                <Link href={postData.author.node.uri}>
                  <a className={`${theme === 'light' ? 'text-[#222]' : 'text-[#efefef]'} font-bold px-1 cursor-pointer`}>{authorName}</a>
                </Link>
              </div>
            )}

            <time>{format(new Date(postData.date), "LLLL d, yyy")}</time>
          </div>
        </div>
        <div>
          <div className="mt-8">
            {featuredVideo ? (
              <FeaturedVideo videoUrl={featuredVideo} />
            ) : (
              <FeaturedImage imageData={postData.featuredImage} imageUrl={srcSetImage} />
            )}
            <div className="flex md:hidden items-center justify-center my-4">
              <Ad adId="ww_mob_a_1" index={index} />
            </div>
          </div>
          <div className="mt-8 mb-4 px-[50px] sm:px-[40px]">
            <ShareButtons url={`https://wrestlingworld.co${router.asPath}`} photoUrl={srcSetImage} />
          </div>
          {postData.content && (
            <div className={`${theme === 'light' ? 'text-[#222]' : 'text-[#efefef]'} px-[5px]  sm:px-0`}>
              <ArticleContent contentData={postData.content} template={1} />
              {hasPagination && (
                <PaginationButtons
                  uri={postData.uri}
                  actualPage={actualPage}
                  hasNext={hasNext}
                  hasPrevious={hasPrevious}
                />
              )}
              <div className="my-5 px-[50px] sm:px-[40px]">
                <ShareButtons url="csds" photoUrl={postData.featuredImage.node.link} />
              </div>
            </div>
          )}
        </div>
        <div className="flex md:hidden items-center justify-center mt-4">
          <Ad adId="ww_mob_a_3" index={index} />
        </div>
      </main >
      {/* ADV Right */}
      {/* <div className="hidden lg:block w-full relative">
        <div className="w-full sticky top-0 flex flex-col items-center space-y-[10px]">
          <Ad adId="ww_a_sb_2" className="mt-4" index={index} />
          <Ad adId="ww_a_sb_4" className="mt-4" index={index} />
        </div>
      </div> */}
    </div >
  );
}

export default PostTemplateOne;
