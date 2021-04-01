import parseJSON from "./parseJSON";
export const json = new parseJSON();

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

export const pageTransition = {
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -100 },
};

const baseThreeStar = [
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

const allChars = [
  "albedo",
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
  "ganyu",
  "xiao",
  "hutao",
];

const allWeapons = [
  "aquila_favonia",
  "sacrificial_fragments",
  "the_widsith",
  "eye_of_perception",
  "magic_guide",
  "memory_of_dust",
  "thrilling_tales_of_dragon_slayers",
  "rainslasher",
  "skyward_atlas",
  "favonius_codex",
  "sacrificial_greatsword",
  "lost_prayer_to_the_sacred_winds",
  "sacrificial_sword",
  "the_flute",
  "skyrider_sword",
  "sharpshooter's_oath",
  "bloodtainted_greatsword",
  "slingshot",
  "favonius_lance",
  "raven_bow",
  "favonius_sword",
  "lion's_roar",
  "cool_steel",
  "debate_club",
  "ferrous_shadow",
  "sacrificial_bow",
  "primordial_jade_winged-spear",
  "the_bell",
  "the_unforged",
  "summit_shaper",
  "favonius_greatsword",
  "harbinger_of_dawn",
  "skyward_pride",
  "black_tassel",
  "dragon's_bane",
  "skyward_spine",
  "the_stringless",
  "emerald_orb",
  "rust",
  "skyward_harp",
  "vortex_vanquisher",
  "favonius_warbow",
  "wolf's_gravestone",
  "amos'_bow",
  "skyward_blade",
  "primordial_jade_cutter",
  "staff_of_homa",
  "lithic_blade",
  "lithic_spear",
];

const allBannersAbbr = [
  "hutao",
  "hutao_ei",
  "xiao",
  "xiao_ei",
  "ganyu",
  "ganyu_ei",
  "albedo",
  "albedo_ei",
  "zhongli",
  "zhongli_ei",
  "childe",
  "childe_ei",
  "klee",
  "klee_ei",
  "venti",
  "venti_ei",
  "standard",
];

export { allChars, allWeapons, allBannersAbbr, baseThreeStar };
