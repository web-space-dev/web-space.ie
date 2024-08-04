import styled from "@emotion/styled";
import Image from "next/image";

const StyledImage = styled(Image)`
  transition: 0.3s ease;
`;

interface CustomImageProps {
  src: string;
  alt: string;
  blurDataURL: string;
  width: number;
  height: number;
}

export function CustomImage({
  src,
  alt,
  blurDataURL,
  width,
  height,
}: CustomImageProps) {
  return (
    <StyledImage
      alt={alt}
      width={width}
      height={height}
      src={src}
      // // placeholder="blur"
      blurDataURL={blurDataURL}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
