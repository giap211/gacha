import { baseThreeStar } from "./Constants";

const randItem = (pool) => pool[Math.floor(Math.random() * pool.length)];

export const CalcWish = (
  currentBanner,
  activeBanners,
  setHasFive,
  setHasFour
) => {
  const wishChance = Math.random();
  const rateUp = Math.random() < 0.5 ? true : false;
  let wishItem;
  activeBanners.map((banner) => {
    if (currentBanner === banner.banner.abbr) {
      // matches banner
      if (wishChance < banner.rateFive || banner.pityFive >= 89) {
        // 5 star
        setHasFive(true);
        banner.pityFive = 0;
        banner.pityFour++;
        if (!(currentBanner === "standard")) {
          // non-standard banner
          if (rateUp || banner.guaranteeFive) {
            // draw from rateUp
            banner.guaranteeFive = false;
            wishItem = randItem(banner.banner.rateUpFive);
          } else {
            // drawing from normal pile
            wishItem = currentBanner.includes("_ei")
              ? randItem(banner.banner.poolFiveWeapon)
              : randItem(banner.banner.poolFiveChar);
            banner.guaranteeFive = true;
          }
        } else {
          // standard banner
          if (wishChance < banner.rateFive / 2)
            wishItem = randItem(banner.banner.poolFiveChar);
          else wishItem = randItem(banner.banner.poolFiveWeapon);
        }
      } else if (wishChance < banner.rateFour || banner.pityFour >= 9) {
        // 4 star
        setHasFour(true);
        banner.pityFour = 0;
        banner.pityFive++;
        if (!(currentBanner === "standard")) {
          // not standard banner
          if (rateUp || banner.guaranteeFour) {
            // draw from rateUp
            banner.guaranteeFour = false;
            wishItem = randItem(banner.banner.rateUpFour);
          } else {
            // draw from non rate up
            banner.guaranteeFour = true;
            if (wishChance < banner.rateFour / 2)
              wishItem = randItem(banner.banner.poolFourChar);
            else wishItem = randItem(banner.banner.poolFourWeapon);
          }
        } else {
          // standard banner
          if (wishChance < banner.rateFour / 2)
            wishItem = randItem(banner.banner.poolFourChar);
          else wishItem = randItem(banner.banner.poolFourWeapon);
        }
      } else {
        // 3 stars
        banner.pityFive++;
        banner.pityFour++;
        wishItem = randItem(baseThreeStar);
      }
    }
    return banner;
  });
  return wishItem;
};
