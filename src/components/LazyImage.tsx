import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type LazyImageProps = { src: string; className: string };

const LazyImage = ({ src, className }: LazyImageProps) => {
  return (
    <LazyLoadImage className={className} alt="image" effect="blur" src={src} />
  );
};

export default LazyImage;
