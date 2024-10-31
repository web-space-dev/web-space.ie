import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { Image as IImage } from "../../interfaces/project";

interface Props {
  title: string;
  coverImage: IImage;
}

export default function CoverImage({ title, coverImage }: Props) {
  return (
    <Image
      width={2000}
      height={1000}
      alt={`Cover Image for ${title}`}
      src={coverImage?.node.sourceUrl}
      blurDataURL={coverImage?.node?.placeholderDataURI}
      placeholder="blur"
    />
  );
}
