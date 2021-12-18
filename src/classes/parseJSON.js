import { allChars } from "../classes/Constants";

class ParseJSON {
  constructor() {
    this.charJSON = require(`../assets/data/char.json`);
    this.weaponJSON = require(`../assets/data/weapons.json`);
    this.bannerJSON = require(`../assets/data/banners.json`);
  }
  isChar(item) {
    if (allChars.includes(item)) return true;
    return false;
  }
  getName(item) {
    const json = this.isChar(item) ? this.charJSON : this.weaponJSON;
    for (const key of json)
      if (key.name.toLowerCase() === item.replace(/_/g, " ")) return key.name;
  }
  getStars(item) {
    const json = this.isChar(item) ? this.charJSON : this.weaponJSON;
    for (const key of json)
      if (key.name.toLowerCase() === item.replace(/_/g, " ")) return key.rarity;
  }
  getMulti(item) {
    const json = this.isChar(item) ? this.charJSON : this.weaponJSON;
    for (const key of json)
      if (key.name.toLowerCase() === item.replace(/_/g, " "))
        return key.gachaMulti;
  }
  getSingle(item) {
    const json = this.isChar(item) ? this.charJSON : this.weaponJSON;
    for (const key of json)
      if (key.name.toLowerCase() === item.replace(/_/g, " "))
        return key.gachaSingle;
  }
  getType(item) {
    if (this.isChar(item)) {
      for (const key of this.charJSON)
        if (key.name.toLowerCase() === item.replace(/_/g, " "))
          return key.vision;
    } else {
      for (const key of this.weaponJSON)
        if (key.name.toLowerCase() === item.replace(/_/g, " ")) return key.type;
    }
  }
  getThumb(item) {
    if (this.isChar(item)) {
      for (const key of this.charJSON)
        if (key.name.toLowerCase() === item.replace(/_/g, " "))
          return key.thumb;
    } else {
      for (const key of this.weaponJSON)
        if (key.name.toLowerCase() === item.replace(/_/g, " "))
          return key.thumb;
    }
  }

  getTitle(item) {
    for (const key of this.bannerJSON) if (key.abbr === item) return key.title;
  }
  getMain(item) {
    for (const key of this.bannerJSON) {
      if (key.abbr === item) return key.mainBanner;
    }
  }
  getMini(item) {
    for (const key of this.bannerJSON)
      if (key.abbr === item) return key.miniBanner;
  }
  getMiniActive(item) {
    for (const key of this.bannerJSON)
      if (key.abbr === item) return key.miniActive;
  }
}

export default ParseJSON;
