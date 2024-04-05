import rockImg from "./assets/rock.svg";
import scissorImg from "./assets/scissor.svg";
import paperImg from "./assets/paper.svg";

export default function HandIcon({ value }) {
  const IMAGES = {
    rock: rockImg,
    scissor: scissorImg,
    paper: paperImg,
  };

  const src = IMAGES[value];
  return <img src={src} alt={value} />;
}
