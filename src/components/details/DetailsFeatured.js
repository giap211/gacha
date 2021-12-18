import React from "react";
import FeaturedIcons from "./FeaturedIcons";

export default function DetailsFeatured({
  featuredFive,
  featuredFour,
  charData,
  weaponData,
  typeData,
  resize,
}) {
  return (
    <section>
      <FeaturedIcons
        featured={featuredFive}
        charData={charData}
        weaponData={weaponData}
        typeData={typeData}
        stars={5}
        resize={resize}
      />
      <FeaturedIcons
        featured={featuredFour}
        charData={charData}
        weaponData={weaponData}
        typeData={typeData}
        stars={4}
        resize={resize}
      />
    </section>
  );
}
