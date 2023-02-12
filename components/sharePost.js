import Image from "next/image.js";
import { useRouter } from "next/router";
import {
  copy, facebook, instagram, linkedin,
  mail,
  pinterest,
  twitter
} from "../pages/assest";

const SharePost = ({ title, description, image }) => {
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`;
  // const url = encodeURIComponent(decodedUrl);

  const generateShareURL = (socialMedia) => {
    switch (socialMedia) {
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      case "twitter":
        return `https://twitter.com/share?text=${title}&url=${url}`;
      case "linkedin":
        return `https://www.linkedin.com/shareArticle?mini=true&title=${title}&url=${url}`;
      case "pinterest":
        return `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${description}`;
      case "instagram":
        return `https://instagram.com/?url=${url}`;
      case "mail":
        return `mailto:?subject=${title}&body=${url}`;
      default:
        return "";
    }
  };

  return (
    <div className="share-post">
      <h3 className="text-gray-600 pb-2 border-b mb-4 w-full">Share this post:</h3>
      <ul className="flex gap-5 flex-wrap">
        <li className="">
          <a
            href={generateShareURL("facebook")}
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <Image className="w-14 h-14 shadow p-2 rounded   object-cover border" src={facebook} alt="Share on facebook" />
          </a>
        </li>
        <li className="">
          <a
            href={generateShareURL("twitter")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image className="w-14 h-14 shadow p-2 rounded   object-cover border" src={twitter} alt="Share on Twitter" />
          </a>
        </li>
        <li className="">
          <a
            href={generateShareURL("linkedin")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image className="w-14 h-14 shadow p-2 rounded   object-cover border" src={linkedin} alt="Share on LinkedIn" />
          </a>
        </li>
        <li className="">
          <a
            href={generateShareURL("pinterest")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image className="w-14 h-14 shadow p-2 rounded   object-cover border" src={pinterest} alt="Share on Pinterest" />
          </a>
        </li>
        <li className="">
          <a
            href={generateShareURL("instagram")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image className="w-14 h-14 shadow p-2 rounded   object-cover border" src={instagram} alt="Share on Instagram" />
          </a>
        </li>
        <li className="">
          <a
            href={generateShareURL("mail")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image className="w-14 h-14 shadow p-2 rounded   object-cover border" src={mail} alt="Share via Mail" />
          </a>
        </li>
        <li>
        <button
          onClick={() => {
            navigator.clipboard.writeText(url);
            alert("URL copied to clipboard");
          }}
        >
          <Image className="w-14 h-14 shadow p-2 rounded object-cover border" src={copy} alt="Copy URL" />
        </button>
      </li>
      </ul>
    </div>
  );
};

export default SharePost;
