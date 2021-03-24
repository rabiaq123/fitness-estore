import React from "react";
import { Carousel as LandingCarousel, Image } from "grommet";
// @ts-ignore
import guy from "../../../assets/black_guy_lifting.png";

export default function Carousel() {
  return (
    <LandingCarousel fill alignSelf="center">
      <Image fit="contain" src={guy} />
      <Image fit="contain" src={guy} />
    </LandingCarousel>
  );
}
