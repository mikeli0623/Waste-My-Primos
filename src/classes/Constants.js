import parseJSON from "../classes/parseJSON";

export const type = {
  Hydro: "./assets/img/misc/hydro.webp",
  Pyro: "./assets/img/misc/pyro.webp",
  Geo: "./assets/img/misc/geo.webp",
  Electro: "./assets/img/misc/electro.webp",
  Dendro: "./assets/img/misc/dendro.webp",
  Cryo: "./assets/img/misc/cryo.webp",
  Anemo: "./assets/img/misc/anemo.webp",
  Bow: "./assets/img/misc/bow.webp",
  Catalyst: "./assets/img/misc/catalyst.webp",
  Claymore: "./assets/img/misc/claymore.webp",
  Polearm: "./assets/img/misc/polearm.webp",
  Sword: "./assets/img/misc/sword.webp",
};

export const baseThreeStar = [
  "sharpshooter's_oath",
  "slingshot",
  "raven_bow",
  "emerald_orb",
  "thrilling_tales_of_dragon_slayers",
  "magic_guide",
  "black_tassel",
  "debate_club",
  "bloodtainted_greatsword",
  "ferrous_shadow",
  "skyrider_sword",
  "harbinger_of_dawn",
  "cool_steel",
];

export const allMiniBanners = [
  "./assets/img/misc/mini-banners/zhongli.webp",
  "./assets/img/misc/mini-banners/childe.webp",
  "./assets/img/misc/mini-banners/klee.webp",
  "./assets/img/misc/mini-banners/venti.webp",
  "./assets/img/misc/mini-banners/zhongli_ei.webp",
  "./assets/img/misc/mini-banners/childe_ei.webp",
  "./assets/img/misc/mini-banners/klee_ei.webp",
  "./assets/img/misc/mini-banners/venti_ei.webp",
  "./assets/img/misc/mini-banners/standard.webp",
];

export const allChars = [
  "amber",
  "barbara",
  "beidou",
  "bennett",
  "chongyun",
  "diluc",
  "diona",
  "fischl",
  "jean",
  "kaeya",
  "keqing",
  "klee",
  "lisa",
  "mona",
  "ningguang",
  "noelle",
  "qiqi",
  "razor",
  "sucrose",
  "tartaglia",
  "venti",
  "xiangling",
  "xingqiu",
  "xinyan",
  "zhongli",
];

export const bannerName = {
  zhongli: "Gentry of Hermitage",
  childe: "Farewell of Snezhnaya",
  klee: "Sparkling Steps",
  venti: "Ballad in Goblets",
};

export const allBannersAbbr = [
  "zhongli",
  "childe",
  "klee",
  "venti",
  "zhongli_ei",
  "childe_ei",
  "klee_ei",
  "venti_ei",
  "standard",
];

export const json = new parseJSON();
