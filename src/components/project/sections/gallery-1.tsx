import React from "react";
import { Gallery } from "../../../interfaces/project";
import useIsDesktop from "../../../hooks/useIsDesktop";
import Gallery1Desktop from "./gallery-1/gallery-1-desktop";
import Gallery1Mobile from "./gallery-1/gallery-1-mobile";
import { Row } from "../../global/grid/Row";
import { Col } from "../../global/grid/Col";
import AnimateInView from "../../global/animation/animateInView";

interface IProps {
  images: Gallery | undefined;
}

export default function Gallery1({ images }: IProps) {
  const isDesktop = useIsDesktop();
  if (!images) return null;
  return (
    <Row>
      <Col span={12}>
        <AnimateInView>
          {isDesktop ? (
            <Gallery1Desktop images={images} />
          ) : (
            <Gallery1Mobile images={images} />
          )}
        </AnimateInView>
      </Col>
    </Row>
  );
}
