import React from "react";
import { Carousel as LandingCarousel, Image } from "grommet";
// @ts-ignore
import guy from "../../../assets/landing_imgs/black_guy_lifting.png";

export default function Carousel() {
  document.title = "Home";
  return (
    // Remember to change the carousel minus colour at the bottom to theme colour
    <LandingCarousel play={15000} fill alignSelf="center">
      <Image fit="contain" src={guy} />
      <Image fit="contain" src={guy} />
    </LandingCarousel>
  );
}
