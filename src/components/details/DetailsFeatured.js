import React from "react";
import FeaturedIcons from "./FeaturedIcons";

export default function DetailsFeatured({
  featuredFive,
  featuredFour,
  resize,
}) {
  return (
    <section>
      <FeaturedIcons featured={featuredFive} stars={5} resize={resize} />
      <FeaturedIcons featured={featuredFour} stars={4} resize={resize} />
    </section>
  );
}
