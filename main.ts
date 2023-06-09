import { writeFileSync } from "node:fs";
import { stringify } from "csv-stringify/sync";

import chibaLibraries from "./data/chiba.json";
import tokyoLibraries from "./data/tokyo.json";

type Library = {
  address: string;
  category: string;
  city: string;
  faid: string | null;
  formal: string;
  geocode: string;
  isil: string | null;
  libid: string;
  libkey: string;
  post: string;
  pref: string;
  short: string;
  systemid: string;
  systemname: string;
  tel: string;
  url_pc: string;
};

const data = new Map();
const libraries = [chibaLibraries, tokyoLibraries].flat() as Library[];

libraries.forEach(({ systemid, pref, city, url_pc }) => {
  data.set(systemid, { systemid, pref, city, url_pc });
});

const cityLibraries = [...data.values()].filter(
  (lib) =>
    !lib.systemid.startsWith("Univ_") && !lib.systemid.startsWith("Special_")
);

writeFileSync(
  "data/city-libraries.csv",
  stringify(cityLibraries, { header: true })
);
