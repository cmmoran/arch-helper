import {ImgRefBind, mixColor} from "@alt1/base"
import {useState} from "react";
import * as a1lib from "../../alt1/alt1/base";
import {clearPngColorspace} from "../../alt1/alt1/base/dist/imagedetect";

export const alt1 = window.alt1

const white = mixColor(255, 255, 255);
const teal = mixColor(0, 255, 255);

const matKeys = [
  'third_age_iron',//
  'samite_silk',
  'white_oak',
  'goldrune',
  'orthenglass',
  'vellum',
  'leather_scraps',
  'soapstone',
  'animal_furs',
  'fossilised_bone',
  'stormguard_steel',//
  'wings_of_war',
  'armadylean_yellow',
  'aetherium_alloy',
  'quintessence',
  'malachite_green',//
  'mark_of_the_kyzaj',
  'vulcanised_rubber',
  'warforged_bronze',
  'yubiusk_clay',
  'compass_rose',//
  'felt',
  'dragon_metal',
  'carbon_black',
  'orgone',
  'keramos',//
  'white_marble',
  'cobalt_blue',
  'everlight_silvthril',
  'star_of_saradomin',
  'cadmium_red',//
  'chaotic_brimstone',
  'demonhide',
  'eye_of_dagon',
  'hellfire_metal',
  'zarosian_insignia',//
  'imperial_steel',
  'ancient_vis',
  'tyrian_purple',
  'blood_of_orcus'
];

const imgs = a1lib.ImageDetect.webpackImages({
  aetherium_alloy_display: require("../public/images/aetherium_alloy.data.png"),
  ancient_vis_display: require("../public/images/ancient_vis.data.png"),
  animal_furs_display: require("../public/images/animal_furs.data.png"),
  armadylean_yellow_display: require("../public/images/armadylean_yellow.data.png"),
  blood_of_orcus_display: require("../public/images/blood_of_orcus.data.png"),
  cadmium_red_display: require("../public/images/cadmium_red.data.png"),
  carbon_black_display: require("../public/images/carbon_black.data.png"),
  chaotic_brimstone_display: require("../public/images/chaotic_brimstone.data.png"),
  cobalt_blue_display: require("../public/images/cobalt_blue.data.png"),
  compass_rose_display: require("../public/images/compass_rose.data.png"),
  demonhide_display: require("../public/images/demonhide.data.png"),
  dragon_metal_display: require("../public/images/dragon_metal.data.png"),
  everlight_silvthril_display: require("../public/images/everlight_silvthril.data.png"),
  eye_of_dagon_display: require("../public/images/eye_of_dagon.data.png"),
  felt_display: require("../public/images/felt.data.png"),
  fossilised_bone_display: require("../public/images/fossilised_bone.data.png"),
  goldrune_display: require("../public/images/goldrune.data.png"),
  hellfire_metal_display: require("../public/images/hellfire_metal.data.png"),
  imperial_steel_display: require("../public/images/imperial_steel.data.png"),
  keramos_display: require("../public/images/keramos.data.png"),
  leather_scraps_display: require("../public/images/leather_scraps.data.png"),
  malachite_green_display: require("../public/images/malachite_green.data.png"),
  mark_of_the_kyzaj_display: require("../public/images/mark_of_the_kyzaj.data.png"),
  orgone_display: require("../public/images/orgone.data.png"),
  orthenglass_display: require("../public/images/orthenglass.data.png"),
  quintessence_display: require("../public/images/quintessence.data.png"),
  samite_silk_display: require("../public/images/samite_silk.data.png"),
  soapstone_display: require("../public/images/soapstone.data.png"),
  star_of_saradomin_display: require("../public/images/star_of_saradomin.data.png"),
  stormguard_steel_display: require("../public/images/stormguard_steel.data.png"),
  third_age_iron_display: require("../public/images/third_age_iron.data.png"),
  tyrian_purple_display: require("../public/images/tyrian_purple.data.png"),
  vellum_display: require("../public/images/vellum.data.png"),
  vulcanised_rubber_display: require("../public/images/vulcanised_rubber.data.png"),
  warforged_bronze_display: require("../public/images/warforged_bronze.data.png"),
  white_marble_display: require("../public/images/white_marble.data.png"),
  white_oak_display: require("../public/images/white_oak.data.png"),
  wings_of_war_display: require("../public/images/wings_of_war.data.png"),
  yubiusk_clay_display: require("../public/images/yubiusk_clay.data.png"),
  zarosian_insignia_display: require("../public/images/zarosian_insignia.data.png")
});

export enum LogLevel {
  ALL,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  NONE
}
export let current_log_level: LogLevel = LogLevel.INFO;

export const logMessage = (message: string, level: LogLevel = LogLevel.INFO) => {
  if(current_log_level.valueOf() > level) {
    return;
  }

}

export const setLogLevel = (level: LogLevel) => {
  current_log_level = level;
}

export const displayDetectionMessage = (message: string, duration: number, size: number = 48, color: number = white) => {
  alt1?.overLayClearGroup("1")
  alt1?.overLaySetGroup("1")
  alt1?.overLayTextEx(message, color, size, Math.round(alt1.rsWidth / 2), Math.round(alt1.rsHeight / 4), duration, "serif", true, true)
};

export const displayMessage = (message: string, group: string, duration: number, size: number = 48, color: number = white) => {
  const batch = [
    ["overlay_continue_group", [group]],
    ["overlay_set_group", [group]],
    ["overlay_text", [message, color, size, Math.round(alt1.rsWidth / 2), Math.round(alt1.rsHeight / 5) * 3, duration, "Menlo", true, true]],
  ];
  if(duration === 0) {
    batch.push(["overlay_freeze_group", [group]]);
  }
  alt1?.overLayBatch(batch);
  // alt1?.overLayClearGroup(group)
  // alt1?.overLaySetGroup(group);
  // alt1?.overLayTextEx(message, color, size, Math.round(alt1.rsWidth / 2), Math.round(alt1.rsHeight / 5) * 3, duration, "serif", true, true)
};

export const clearMessage = (group: string) => {
  alt1?.overLayClearGroup(group);
}
/*
export const displayImage = (image: string, group: string, duration: number, x: number, y: number) => {
  imgs.promise.then(p => {
    alt1?.overLaySetGroup(group);
    alt1?.overLayContinueGroup(group);
    const im = p[`${image}_display`];
    alt1?.overLayImage(x, y, im.toPngBase64(), im.width, duration);
    alt1?.overLayRect(-1, x - 1, y - 1, im.width + 2, im.height + 2, duration, 2);
    alt1?.overLayFreezeGroup(group);
  });
};*/

export const matsToTextModel = (mats: Material[]) => {
  const local = [...(mats !== null && mats !== undefined && mats.length > 0 ? mats : [])]
  return local.reduce((obj, item) => (obj[item.key] = {qty: item.qty}, obj), {});
}

export const displayMaterials = (mats: Material[], group: string, cols: number) => {
  const mats_model = matsToTextModel(mats);
  imgs.promise.then(p => {
    const batch = [
      ["overlay_set_group", [group, mats_model]],
      ["overlay_continue_group", [group]],
    ];
    const rows = Math.max(1, Math.ceil(mats.length / cols));
    const needed_cols = Math.min(cols, Math.ceil(mats.length / rows));
    let row_col = 0;
    let _x = (im, col) => alt1.rsWidth / 2 - (5 + needed_cols * (im.width + 5 + 2)) / 2 + (5 + col * (im.width + 5 + 2));
    let _y = (im, row) => alt1.rsHeight / 5 - (5 + rows * (im.height + 5 + 2)) / 2 + (5 + row * (im.height + 5 + 2)) + 30;
    mats.forEach(m => {
      const im = p[`${m.key}_display`];
      let x = _x(im, row_col % cols);
      let y = _y(im, Math.floor(row_col / cols));
      batch.push(
        ["overlay_image", [im.toPngBase64(), x, y, 0]],
        ["overlay_text", [`{self.${m.key}.qty}`, mixColor(255, 255, 0), 16, x + im.width / 2, y + im.height / 2, 0, "Menlo", true, true]],
        ["overlay_rect", [-1, x - 1, y - 1, im.width + 2, im.height + 2, 0, 2]],
      )
      row_col++;
    });
    batch.push(["overlay_freeze_group", [group]])
    alt1.overLayBatch(batch);
  });
};

export const updateMaterials = (group, mats: Material[]) => {
  const message_model = {
    ...matsToTextModel(mats),
    __animate: true
  };
  alt1.overLaySetGroup(group, message_model);
};

export const toggleCrosshairs = (visible: boolean) => {
  const batch = visible ? [
    ['overlay_set_group', ['xr']],
    ['overlay_line', [white, 1, alt1.rsWidth / 2, -3 * alt1.rsWidth, alt1.rsWidth / 2, 3 * alt1.rsWidth, 0]],
    ['overlay_line', [white, 1, -3 * alt1.rsHeight, alt1.rsHeight / 2, 3 * alt1.rsHeight, alt1.rsHeight / 2, 0]],
    ['overlay_text', ['pos: {self.mouse_x}, {self.mouse_y}', teal, 20, alt1.rsWidth / 2 + 15, alt1.rsHeight / 2 - 30, 0, 'Menlo', false, true]],
    ['overlay_freeze_group', ['xr']],
    ['overlay_move_group', ['xr', true]]
  ] : [
    ['overlay_move_group', ['xr', false]],
    ["overlay_clear_group", ["xr"]]
  ];
  alt1.overLayBatch(batch);
}

export const enumKeys = <O extends object, K extends keyof O = keyof O>(obj: O): K[] => {
  return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
}


export const sortMats = (mats: Material[], keys: string[], inverse: boolean = false) => {
  const local = [...(mats !== null && mats.length > 0 ? mats : [])]
  return local.sort((a, b) => {
    const s = (y, z) => {
      if (typeof y === 'string' && typeof z === 'string') {
        let comp = inverse ? z.localeCompare(y) : y.localeCompare(z);
        return comp === 0 ? 0 : comp < 0 ? -1 : 1;
      } else if (typeof y === 'number' && typeof z === 'number') {
        let comp = inverse ? z - y : y - z;
        return comp === 0 ? 0 : comp < 0 ? -1 : 1;
      }
    };
    return keys.map(k => s(a[k], b[k])).reduce((p, c, i, a) => {
      return p === undefined ? c : p === 0 ? c : p;
    }, undefined)
  });
};

export const hide = (group: string) => {
  alt1.overLayContinueGroup(group);
  alt1.overLayClearGroup(group);
};

export const screenshot = (): void => {
  const img: ImgRefBind = a1lib.captureHoldFullRs();
  // const img: ImgRefBind = a1lib.captureHold(4, 1398, 44, 15); // minus chat button
  // const img: ImgRefBind = a1lib.captureHold(505, 1221, 14, 14); // minus chat button
  // const img: ImgRefBind = a1lib.captureHold(477, 1047, 36, 20);
  img.toData().toFileBytes("image/png")
    .then(b => {
      clearPngColorspace(b);
      const blob = new Blob([b], {type: "image/png"});
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `screenshot-${+new Date()}.png`;
      link.click();
      console.log("Screenshot should have downloaded...");
    })

};

// Hook
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? Object.assign(initialValue, JSON.parse(item)) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
};

export const abuseLocalStorage = <T>(key: string, initialValue: T) => {
  const _storedValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  };
  const storedValue = _storedValue();
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}

export const todayFormatted = () => {
  let d = Date.now();
  let ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d);
  let mo = new Intl.DateTimeFormat('en', {month: 'short'}).format(d);
  let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d);
  return `${da}-${mo}-${ye}`;
}

const [lru, setLru] = abuseLocalStorage<string[]>('chat_lru', []);

export const detectChatArch = (line: string, mats: Material[]) => {
  let today = todayFormatted();
  let found = {
    type: '',
    command: {
      type: null,
      args: null
    },
    mat: null,
    color: white,
    hash: md5(today + ' ' + line),
    changes: false
  };
  if (lru.indexOf(found.hash) > -1) {
    console.log(`Duplicate found: ${line} -> ${found.hash}`);
    return found;
  }
  if (line.indexOf('The time sprite has moved to another') > -1) {
    console.log('TIME SPRITE MOVED!');
    // displayMessage(`TIME SPRITE MOVED!!!`, "time_sprite", 5000, 48, teal);
    lru.splice(0, 0, found.hash);
  }
  if (line.indexOf('You find some') > -1) {
    found.type = 'Normal';
    found.color = white;
  } else if (line.indexOf('Your auto-screener') > -1) {
    found.type = 'Auto-screener';
    found.color = white;
  } else if (line.indexOf('Your incense burner') > -1) {
    found.type = 'Incense';
    found.color = white;
  } else if (line.indexOf('Your familiar has produced an item') > -1) {
    found.type = 'Familiar';
    found.color = mixColor(0, 255, 255);
  } else if (line.indexOf("storage") > -1) {
    if (line.indexOf('Fortune perk') > -1) {
      found.type = 'Fortune';
      found.color = mixColor(45, 186, 21);
    } else if (line.indexOf('Your imp-souled perk') > -1) {
      found.type = 'Imp-souled';
      found.color = mixColor(0, 255, 0);
    } else {
      found.type = 'Porter';
      found.color = mixColor(255, 255, 0);
    }
  } else if ((line.indexOf("Fortune perk") > -1 || line.indexOf("Your imp-souled perk") > -1) && line.indexOf("your bank") > -1) {
    if (line.indexOf('Fortune perk') > -1) {
      found.type = 'Fortune';
    } else if (line.indexOf('Your imp-souled perk') > -1) {
      found.type = 'Imp-souled';
    }
  } else {
    if(line.indexOf("Materials: ") > -1) {
      console.log("Possible materials? " + line);
      const names = line.split(':')[3].trim().split(', ');
      found.command = {
        type: 'Sort',
        args: {
          filter: "ARG_FILTER",
          filterArgs: {
            name: names
          },
          sort: {
            keys: ['faction', 'id'],
            desc: false
          }
        }
      };
    }
    return found;
  }
  lru.splice(0, 0, found.hash);
  if (lru.length > 200) {
    setLru([...lru.slice(0, 200)])
  } else {
    setLru([...lru]);
  }
  mats.forEach(c => {
    if (line.match(RegExp("[:]?\s?(\d+\sx\s)?" + c.name + ".?"))) {
      console.log(`Detected: ${c.name} from ${found.type}`);
      c.qty++;
      c.last = Date.now();
      found.changes = true;
      found.mat = c;
      // displayMessage(`${c.name} from ${found.type}: ${c.qty}`, "arch_message", 3000, 20, found.color);
    }
  });
  return found;
};

export type Material = {
  id: number,
  name: string,
  qty: number,
  goal: number,
  hide: boolean,
  level: number,
  faction: "Agnostic" | "Armadylean" | "Bandosian" | "Dragonkin" | "Saradominist" | "Zamorakian" | "Zarosian",
  location: string,
  key: string,
  last: number;
};

export const materials: Material[] = [{
  id: 0,
  name: "Third Age iron",
  qty: 0,
  goal: 0,
  hide: false,
  level: 5,
  faction: "Agnostic",
  location: "Varrock Dig Site\nKharid-et\nInfernal Source\nEverlight\nStormguard Citadel\nWarforge",
  key: "third_age_iron",
  last: 0
}, {
  id: 2,
  name: "Samite silk",
  qty: 0,
  goal: 0,
  hide: false,
  level: 12,
  faction: "Agnostic",
  location: "Kharid-et (barracks)\nKharid-et entrance",
  key: "samite_silk",
  last: 0
}, {
  id: 4,
  name: "White oak",
  qty: 0,
  goal: 0,
  hide: false,
  level: 17,
  faction: "Agnostic",
  location: "Ice Mountain\nKharid-et\nInfernal Source\nEverlight\nStormguard Citadel\nWarforge",
  key: "white_oak",
  last: 0
}, {
  id: 5,
  name: "Goldrune",
  qty: 0,
  goal: 0,
  hide: false,
  level: 20,
  faction: "Agnostic",
  location: "Kharid-et\nCamdozaal",
  key: "goldrune",
  last: 0
}, {
  id: 6,
  name: "Orthenglass",
  qty: 0,
  goal: 0,
  hide: false,
  level: 20,
  faction: "Agnostic",
  location: "Anachronia (north)",
  key: "orthenglass",
  last: 0
}, {
  id: 7,
  name: "Vellum",
  qty: 0,
  goal: 0,
  hide: false,
  level: 24,
  faction: "Agnostic",
  location: "First Tower",
  key: "vellum",
  last: 0
}, {
  id: 11,
  name: "Leather scraps",
  qty: 0,
  goal: 0,
  hide: false,
  level: 29,
  faction: "Agnostic",
  location: "Morytania (north)\nInfernal Source (Dungeon of Disorder)",
  key: "leather_scraps",
  last: 0
}, {
  id: 24,
  name: "Animal furs",
  qty: 0,
  goal: 0,
  hide: false,
  level: 76,
  faction: "Agnostic",
  location: "Feldip",
  key: "animal_furs",
  last: 0
}, {
  id: 30,
  name: "Fossilised bone",
  qty: 0,
  goal: 0,
  hide: false,
  level: 81,
  faction: "Agnostic",
  location: "Ancient cavern\nOdd old man",
  key: "fossilised_bone",
  last: 0
}, {
  id: 37,
  name: "Soapstone",
  qty: 0,
  goal: 0,
  hide: false,
  level: 98,
  faction: "Agnostic",
  location: "Waiko",
  key: "soapstone",
  last: 0
}, {
  id: 22,
  name: "Stormguard steel",
  qty: 0,
  goal: 0,
  hide: false,
  level: 70,
  faction: "Armadylean",
  location: "Stormguard Citadel (Research & Development, south-west)\nGod Wars Dungeon (Armadylean, south-west)",
  key: "stormguard_steel",
  last: 0
}, {
  id: 23,
  name: "Wings of War",
  qty: 0,
  goal: 0,
  hide: false,
  level: 70,
  faction: "Armadylean",
  location: "Stormguard Citadel (Dayguard tower)\nStormguard Citadel (Nightguard)\nGod Wars Dungeon (Armadylean, south-west)",
  key: "wings_of_war",
  last: 0
}, {
  id: 25,
  name: "Armadylean yellow",
  qty: 0,
  goal: 0,
  hide: false,
  level: 76,
  faction: "Armadylean",
  location: "Stormguard Citadel (Keshik memorial)\nStormguard Citadel (Relay station)\nEmpyrean Citadel",
  key: "armadylean_yellow",
  last: 0
}, {
  id: 32,
  name: "Aetherium alloy",
  qty: 0,
  goal: 0,
  hide: false,
  level: 85,
  faction: "Armadylean",
  location: "Stormguard Citadel (Research & Development, north-east)\nStormguard Citadel (Research & Development, north-west)\nEmpyrean Citadel",
  key: "aetherium_alloy",
  last: 0
}, {
  id: 35,
  name: "Quintessence",
  qty: 0,
  goal: 0,
  hide: false,
  level: 91,
  faction: "Armadylean",
  location: "Stormguard Citadel (Research & Development, north-east)\nStormguard Citadel (Howl's workshop)\nEmpyrean Citadel",
  key: "quintessence",
  last: 0
}, {
  id: 26,
  name: "Malachite green",
  qty: 0,
  goal: 0,
  hide: false,
  level: 76,
  faction: "Bandosian",
  location: "Warforge (Crucible arena)\nWarforge (north goblin tunnels)\nGod Wars Dungeon (Bandos's Stronghold)",
  key: "malachite_green",
  last: 0
}, {
  id: 27,
  name: "Mark of the Kyzaj",
  qty: 0,
  goal: 0,
  hide: false,
  level: 76,
  faction: "Bandosian",
  location: "Warforge (north goblin tunnels)\nGod Wars Dungeon (Bandosian west)",
  key: "mark_of_the_kyzaj",
  last: 0
}, {
  id: 28,
  name: "Vulcanised rubber",
  qty: 0,
  goal: 0,
  hide: false,
  level: 76,
  faction: "Bandosian",
  location: "Warforge (south goblin tunnels)\nFeldip (shores)",
  key: "vulcanised_rubber",
  last: 0
}, {
  id: 29,
  name: "Warforged bronze",
  qty: 0,
  goal: 0,
  hide: false,
  level: 76,
  faction: "Bandosian",
  location: "Warforge (Crucible arena)\nWarforge (north goblin tunnels)\nGod Wars Dungeon (Bandosian, north)\nGod Wars Dungeon (Bandos's Stronghold)",
  key: "warforged_bronze",
  last: 0
}, {
  id: 31,
  name: "Yu'biusk clay",
  qty: 0,
  goal: 0,
  hide: false,
  level: 83,
  faction: "Bandosian",
  location: "Warforge (animal pens)\nFeldip (shores)",
  key: "yubiusk_clay",
  last: 0
}, {
  id: 33,
  name: "Compass rose",
  qty: 0,
  goal: 0,
  hide: false,
  level: 90,
  faction: "Dragonkin",
  location: "Orthen (Crypt of Varanus)\nAncient cavern",
  key: "compass_rose",
  last: 0
}, {
  id: 34,
  name: "Felt",
  qty: 0,
  goal: 0,
  hide: false,
  level: 90,
  faction: "Dragonkin",
  location: "Orthen (Crypt of Varanus)\nOrthen (Observation outpost)\nAnachronia (west)",
  key: "felt",
  last: 0
}, {
  id: 36,
  name: "Dragon metal",
  qty: 0,
  goal: 0,
  hide: false,
  level: 96,
  faction: "Dragonkin",
  location: "Orthen (Observation outpost)\nOrthen (Xolo city)\nAncient cavern",
  key: "dragon_metal",
  last: 0
}, {
  id: 38,
  name: "Carbon black",
  qty: 0,
  goal: 0,
  hide: false,
  level: 99,
  faction: "Dragonkin",
  location: "Orthen (Moksha ritual site)\nMount Firewake",
  key: "carbon_black",
  last: 0
}, {
  id: 39,
  name: "Orgone",
  qty: 0,
  goal: 0,
  hide: false,
  level: 99,
  faction: "Dragonkin",
  location: "Orthen (Moksha ritual site)\nOrthen (Xolo city)\nAnachronia (west)",
  key: "orgone",
  last: 0
}, {
  id: 16,
  name: "Keramos",
  qty: 0,
  goal: 0,
  hide: false,
  level: 42,
  faction: "Saradominist",
  location: "Everlight (mass grave)\nEverlight (Oikoi)\nGod Wars Dungeon (Saradominist, south-east)",
  key: "keramos",
  last: 0
}, {
  id: 17,
  name: "White marble",
  qty: 0,
  goal: 0,
  hide: false,
  level: 42,
  faction: "Saradominist",
  location: "Everlight (Dominion Games stadium)\nEverlight (Acropolis)\nFirst Tower",
  key: "white_marble",
  last: 0
}, {
  id: 18,
  name: "Cobalt blue",
  qty: 0,
  goal: 0,
  hide: false,
  level: 48,
  faction: "Saradominist",
  location: "Everlight (Amphitheatre)\nGod Wars Dungeon (Saradominist, south-east)",
  key: "cobalt_blue",
  last: 0
}, {
  id: 19,
  name: "Everlight silvthril",
  qty: 0,
  goal: 0,
  hide: false,
  level: 51,
  faction: "Saradominist",
  location: "Everlight (Dominion Games stadium)\nBarrows mounds",
  key: "everlight_silvthril",
  last: 0
}, {
  id: 20,
  name: "Star of Saradomin",
  qty: 0,
  goal: 0,
  hide: false,
  level: 51,
  faction: "Saradominist",
  location: "Everlight (Acropolis)\nBarrows mounds",
  key: "star_of_saradomin",
  last: 0
}, {
  id: 8,
  name: "Cadmium red",
  qty: 0,
  goal: 0,
  hide: false,
  level: 24,
  faction: "Zamorakian",
  location: "Infernal Source (Star Lodge cellar)\nInfernal Source (Dagon Overlook south-west)\nFirst Tower",
  key: "cadmium_red",
  last: 0
}, {
  id: 12,
  name: "Chaotic brimstone",
  qty: 0,
  goal: 0,
  hide: false,
  level: 29,
  faction: "Zamorakian",
  location: "Infernal Source (Vestibule of Futility, south)\nDaemonheim (south-west)",
  key: "chaotic_brimstone",
  last: 0
}, {
  id: 13,
  name: "Demonhide",
  qty: 0,
  goal: 0,
  hide: false,
  level: 29,
  faction: "Zamorakian",
  location: "Infernal Source (The Harrowing, north & north north west)\nGod Wars Dungeon (Zamorak's Fortress, east)",
  key: "demonhide",
  last: 0
}, {
  id: 14,
  name: "Eye of Dagon",
  qty: 0,
  goal: 0,
  hide: false,
  level: 36,
  faction: "Zamorakian",
  location: "Infernal Source (Dungeon of Disorder, south-east)\nDaemonheim (south-west)",
  key: "eye_of_dagon",
  last: 0
}, {
  id: 15,
  name: "Hellfire metal",
  qty: 0,
  goal: 0,
  hide: false,
  level: 36,
  faction: "Zamorakian",
  location: "Infernal Source (Dungeon of Disorder)\nInfernal Source (Vestibule of Futility, north-east)\nInfernal Source (Dagon Overlook, north)\nGod Wars Dungeon (Zamorak's Fortress. north)",
  key: "hellfire_metal",
  last: 0
}, {
  id: 1,
  name: "Zarosian insignia",
  qty: 0,
  goal: 0,
  hide: false,
  level: 5,
  faction: "Zarosian",
  location: "Kharid-et (barracks)\nEmpty Throne Room",
  key: "zarosian_insignia",
  last: 0
}, {
  id: 3,
  name: "Imperial steel",
  qty: 0,
  goal: 0,
  hide: false,
  level: 12,
  faction: "Zarosian",
  location: "Kharid-et (barracks)\nEmpty Throne Room (east)",
  key: "imperial_steel",
  last: 0
}, {
  id: 9,
  name: "Ancient vis",
  qty: 0,
  goal: 0,
  hide: false,
  level: 25,
  faction: "Zarosian",
  location: "Kharid-et (Culinarum)\nSlayer Tower",
  key: "ancient_vis",
  last: 0
}, {
  id: 10,
  name: "Tyrian purple",
  qty: 0,
  goal: 0,
  hide: false,
  level: 25,
  faction: "Zarosian",
  location: "Kharid-et (barracks)\nEmpty Throne Room (south)",
  key: "tyrian_purple",
  last: 0
}, {
  id: 21,
  name: "Blood of Orcus",
  qty: 0,
  goal: 0,
  hide: false,
  level: 58,
  faction: "Zarosian",
  location: "Kharid-et (Chapel)\nSlayer Tower",
  key: "blood_of_orcus",
  last: 0
}];

export const artefactsList = Object.freeze([
  {
    name: "Venator dagger",
    level: 5,
    experience: 305.1,
    mats: [
      {
        name: "Third Age iron",
        qty: 16,
      },
      {
        name: "Zarosian insignia",
        qty: 12,
      },
    ],
    collections: ["Zarosian I", "Museum - Zarosian I"],
  },
  {
    name: "Venator light crossbow",
    level: 5,
    experience: 305.1,
    mats: [
      {
        name: "Third Age iron",
        qty: 12,
      },
      {
        name: "Zarosian insignia",
        qty: 16,
      },
    ],
    collections: ["Zarosian I", "Museum - Zarosian I"],
  },
  {
    name: "Centurions seal",
    level: 12,
    experience: 430.8,
    mats: [
      {
        name: "Third Age iron",
        qty: 6,
      },
      {
        name: "Zarosian insignia",
        qty: 2,
      },
    ],
    collections: ["Other"],
  },
  {
    name: "Legionary gladius",
    level: 12,
    experience: 430.8,
    mats: [
      {
        name: "Third Age iron",
        qty: 10,
      },
      {
        name: "Zarosian insignia",
        qty: 6,
      },
      {
        name: "Imperial steel",
        qty: 12,
      },
    ],
    collections: ["Zarosian I", "Museum - Zarosian I"],
  },
  {
    name: "Legionary square shield",
    level: 12,
    experience: 430.8,
    mats: [
      {
        name: "Third Age iron",
        qty: 8,
      },
      {
        name: "Zarosian insignia",
        qty: 8,
      },
      {
        name: "Imperial steel",
        qty: 12,
      },
    ],
    collections: ["Zarosian I", "Museum - Zarosian I"],
  },
  {
    name: "Primis Elementis standard",
    level: 12,
    experience: 430.8,
    mats: [
      {
        name: "Samite silk",
        qty: 16,
      },
      {
        name: "Third Age iron",
        qty: 12,
      },
    ],
    collections: ["Zarosian I", "Museum - Zarosian I"],
  },
  {
    name: "Zaros effigy",
    level: 17,
    experience: 520.5,
    mats: [
      {
        name: "Samite silk",
        qty: 8,
      },
      {
        name: "White oak",
        qty: 10,
      },
      {
        name: "Zarosian insignia",
        qty: 12,
      },
    ],
    collections: ["Zarosian I", "Museum - Zarosian I"],
  },
  {
    name: "Zarosian training dummy",
    level: 17,
    experience: 520.5,
    mats: [
      {
        name: "Third Age iron",
        qty: 16,
      },
      {
        name: "White oak",
        qty: 14,
      },
    ],
    collections: ["Zarosian I", "Museum - Zarosian I"],
  },
  {
    name: "Hookah pipe",
    level: 20,
    experience: 574.4,
    mats: [
      {
        name: "Third Age iron",
        qty: 10,
      },
      {
        name: "Goldrune",
        qty: 12,
      },
      {
        name: "Orthenglass",
        qty: 8,
      },
    ],
    collections: ["Smoky Fings", "Zamorakian I", "Museum - Zamorakian I"],
  },
  {
    name: "Opulent wine goblet",
    level: 20,
    experience: 574.4,
    mats: [
      {
        name: "Third Age iron",
        qty: 14,
      },
      {
        name: "Goldrune",
        qty: 16,
      },
    ],
    collections: ["Smoky Fings", "Zamorakian I", "Museum - Zamorakian I"],
  },
  {
    name: "Crest of Dagon",
    level: 24,
    experience: 646.2,
    mats: [
      {
        name: "Goldrune",
        qty: 14,
      },
      {
        name: "Orthenglass",
        qty: 18,
      },
    ],
    collections: [
      "Showy Fings",
      "Zamorakian I",
      "Museum - Zamorakian I",
      "Knowledge is Power",
    ],
  },
  {
    name: "Disorder painting",
    level: 24,
    experience: 646.2,
    mats: [
      {
        name: "Samite silk",
        qty: 6,
      },
      {
        name: "White oak",
        qty: 6,
      },
      {
        name: "Vellum",
        qty: 6,
      },
      {
        name: "Cadmium red",
        qty: 14,
      },
    ],
    collections: [
      "Anarchic Abstraction",
      "Zamorakian I",
      "Museum - Zamorakian I",
    ],
  },
  {
    name: "Legatus Maximus figurine",
    level: 25,
    experience: 664.1,
    mats: [
      {
        name: "Goldrune",
        qty: 8,
      },
      {
        name: "Zarosian insignia",
        qty: 14,
      },
      {
        name: "Ancient vis",
        qty: 10,
      },
    ],
    collections: [
      "Showy Fings",
      "Zarosian I",
      "Museum - Zarosian I",
      "Magic Man",
    ],
  },
  {
    name: "Solem in Umbra painting",
    level: 25,
    experience: 664.1,
    mats: [
      {
        name: "Samite silk",
        qty: 8,
      },
      {
        name: "White oak",
        qty: 10,
      },
      {
        name: "Tyrian purple",
        qty: 14,
      },
    ],
    collections: [
      "Imperial Impressionism",
      "Zarosian I",
      "Museum - Zarosian I",
    ],
  },
  {
    name: "Imp mask",
    level: 29,
    experience: 735.9,
    mats: [
      {
        name: "Leather scraps",
        qty: 10,
      },
      {
        name: "Chaotic brimstone",
        qty: 10,
      },
      {
        name: "Demonhide",
        qty: 12,
      },
    ],
    collections: ["Zamorakian I", "Museum - Zamorakian I", "Hat Problem"],
  },
  {
    name: "Lesser demon mask",
    level: 29,
    experience: 735.9,
    mats: [
      {
        name: "Leather scraps",
        qty: 6,
      },
      {
        name: "Chaotic brimstone",
        qty: 8,
      },
      {
        name: "Demonhide",
        qty: 12,
      },
      {
        name: "Cadmium red",
        qty: 6,
      },
    ],
    collections: ["Zamorakian I", "Museum - Zamorakian I", "Hat Hoarder"],
  },
  {
    name: "Greater demon mask",
    level: 29,
    experience: 735.9,
    mats: [
      {
        name: "Third Age iron",
        qty: 6,
      },
      {
        name: "Leather scraps",
        qty: 6,
      },
      {
        name: "Chaotic brimstone",
        qty: 8,
      },
      {
        name: "Demonhide",
        qty: 12,
      },
    ],
    collections: ["Zamorakian I", "Museum - Zamorakian I", "Hat Hoarder"],
  },
  {
    name: "Order of Dis robes",
    level: 36,
    experience: 861.5,
    mats: [
      {
        name: "Samite silk",
        qty: 16,
      },
      {
        name: "Cadmium red",
        qty: 10,
      },
      {
        name: "Eye of Dagon",
        qty: 14,
      },
    ],
    collections: ["Zamorakian I", "Museum - Zamorakian I"],
  },
  {
    name: "Ritual dagger",
    level: 36,
    experience: 861.5,
    mats: [
      {
        name: "Goldrune",
        qty: 16,
      },
      {
        name: "Hellfire metal",
        qty: 24,
      },
    ],
    collections: ["Zamorakian I", "Museum - Zamorakian I", "Magic Man"],
  },
  {
    name: "Frying pan",
    level: 42,
    experience: 1073.3,
    mats: [
      {
        name: "Third Age iron",
        qty: 20,
      },
      {
        name: "White marble",
        qty: 24,
      },
    ],
    collections: ["Saradominist I", "Museum - Saradominist I"],
  },
  {
    name: "Hallowed lantern",
    level: 42,
    experience: 1073.3,
    mats: [
      {
        name: "Third Age iron",
        qty: 20,
      },
      {
        name: "Keramos",
        qty: 24,
      },
    ],
    collections: ["Saradominist I", "Museum - Saradominist I"],
  },
  {
    name: "Branding iron",
    level: 45,
    experience: 1283.3,
    mats: [
      {
        name: "Third Age iron",
        qty: 14,
      },
      {
        name: "Eye of Dagon",
        qty: 12,
      },
      {
        name: "Hellfire metal",
        qty: 20,
      },
    ],
    collections: ["Zamorakian II", "Museum - Zamorakian II"],
  },
  {
    name: "Manacles",
    level: 45,
    experience: 1283.3,
    mats: [
      {
        name: "Third Age iron",
        qty: 14,
      },
      {
        name: "Chaotic brimstone",
        qty: 18,
      },
      {
        name: "Eye of Dagon",
        qty: 14,
      },
    ],
    collections: ["Zamorakian II", "Museum - Zamorakian II"],
  },
  {
    name: "Ancient timepiece",
    level: 47,
    experience: 1423.3,
    mats: [
      {
        name: "Goldrune",
        qty: 12,
      },
      {
        name: "Imperial steel",
        qty: 16,
      },
      {
        name: "Ancient vis",
        qty: 18,
      },
    ],
    collections: [
      "Blingy Fings",
      "Zarosian II",
      "Museum - Zarosian II",
      "Magic Man",
    ],
  },
  {
    name: "Legatus pendant",
    level: 47,
    experience: 1423.3,
    mats: [
      {
        name: "Third Age iron",
        qty: 16,
      },
      {
        name: "Goldrune",
        qty: 18,
      },
      {
        name: "Ancient vis",
        qty: 12,
      },
    ],
    collections: ["Blingy Fings", "Zarosian II", "Museum - Zarosian II"],
  },
  {
    name: "Ceremonial unicorn ornament",
    level: 48,
    experience: 1493.3,
    mats: [
      {
        name: "Keramos",
        qty: 26,
      },
      {
        name: "Cobalt blue",
        qty: 20,
      },
    ],
    collections: ["Saradominist I", "Museum - Saradominist I", "Hat Hoarder"],
  },
  {
    name: "Ceremonial unicorn saddle",
    level: 48,
    experience: 1493.3,
    mats: [
      {
        name: "Leather scraps",
        qty: 24,
      },
      {
        name: "Cobalt blue",
        qty: 22,
      },
    ],
    collections: ["Saradominist I", "Museum - Saradominist I"],
  },
  {
    name: "Tetracompass (unpowered)",
    level: 50,
    experience: 2065,
    mats: [
      {
        name: "Malachite green",
        qty: 30,
      },
      {
        name: "Cadmium red",
        qty: 30,
      },
      {
        name: "Cobalt blue",
        qty: 30,
      },
      {
        name: "Armadylean yellow",
        qty: 30,
      },
      {
        name: "Tyrian purple",
        qty: 30,
      },
    ],
    collections: ["Other"],
  },
  {
    name: "Everlight harp",
    level: 51,
    experience: 1703.3,
    mats: [
      {
        name: "Everlight silvthril",
        qty: 30,
      },
      {
        name: "White oak",
        qty: 22,
      },
    ],
    collections: [
      "Saradominist I",
      "Museum - Saradominist I",
      "Wise Am the Music Man",
    ],
  },
  {
    name: "Everlight trumpet",
    level: 51,
    experience: 1703.3,
    mats: [
      {
        name: "Everlight silvthril",
        qty: 28,
      },
      {
        name: "Goldrune",
        qty: 24,
      },
    ],
    collections: [
      "Smoky Fings",
      "Saradominist I",
      "Museum - Saradominist I",
      "Wise Am the Music Man",
    ],
  },
  {
    name: "Everlight violin",
    level: 51,
    experience: 1703.3,
    mats: [
      {
        name: "Star of Saradomin",
        qty: 16,
      },
      {
        name: "White oak",
        qty: 20,
      },
      {
        name: "Samite silk",
        qty: 16,
      },
    ],
    collections: [
      "Saradominist I",
      "Museum - Saradominist I",
      "Wise Am the Music Man",
    ],
  },
  {
    name: "Folded-arm figurine (female)",
    level: 56,
    experience: 2053.3,
    mats: [
      {
        name: "White marble",
        qty: 30,
      },
      {
        name: "Goldrune",
        qty: 24,
      },
    ],
    collections: ["Saradominist I", "Museum - Saradominist I"],
  },
  {
    name: "Folded-arm figurine (male)",
    level: 56,
    experience: 2053.3,
    mats: [
      {
        name: "White marble",
        qty: 30,
      },
      {
        name: "Goldrune",
        qty: 24,
      },
    ],
    collections: ["Saradominist I", "Museum - Saradominist I"],
  },
  {
    name: "Pontifex signet ring",
    level: 58,
    experience: 2193.3,
    mats: [
      {
        name: "Third Age iron",
        qty: 16,
      },
      {
        name: "Goldrune",
        qty: 18,
      },
      {
        name: "Ancient vis",
        qty: 22,
      },
    ],
    collections: ["Blingy Fings", "Zarosian II", "Museum - Zarosian II"],
  },
  {
    name: "Incite Fear spell scroll",
    level: 58,
    experience: 2193.3,
    mats: [
      {
        name: "Vellum",
        qty: 20,
      },
      {
        name: "Ancient vis",
        qty: 18,
      },
      {
        name: "Blood of Orcus",
        qty: 18,
      },
    ],
    collections: [
      "Zarosian II",
      "Museum - Zarosian II",
      "Magic Man",
      "Imperial Sorcery",
    ],
  },
  {
    name: "Apex cap",
    level: 60,
    experience: 2193.3,
    mats: [
      {
        name: "Samite silk",
        qty: 28,
      },
      {
        name: "Leather scraps",
        qty: 12,
      },
      {
        name: "Ancient vis",
        qty: 20,
      },
    ],
    collections: ["Museum - Zarosian V", "Religious Iconography"],
  },
  {
    name: "Curse tablet",
    level: 60,
    experience: 2333.3,
    mats: [
      {
        name: "Imperial steel",
        qty: 16,
      },
      {
        name: "Zarosian insignia",
        qty: 12,
      },
      {
        name: "Soapstone",
        qty: 20,
      },
      {
        name: "Blood of Orcus",
        qty: 12,
      },
    ],
    collections: ["Museum - Zarosian V", "Imperial Sorcery"],
  },
  {
    name: "Funerary urn of shadow",
    level: 60,
    experience: 2333.3,
    mats: [
      {
        name: "Soapstone",
        qty: 26,
      },
      {
        name: "Tyrian purple",
        qty: 14,
      },
      {
        name: "Ancient vis",
        qty: 20,
      },
    ],
    collections: ["Museum - Zarosian V", "Urns of the Empire"],
  },
  {
    name: "Dominion discus",
    level: 61,
    experience: 2566.7,
    mats: [
      {
        name: "Keramos",
        qty: 34,
      },
      {
        name: "Star of Saradomin",
        qty: 28,
      },
    ],
    collections: ["Saradominist II", "Museum - Saradominist II"],
  },
  {
    name: "Dominion javelin",
    level: 61,
    experience: 2566.7,
    mats: [
      {
        name: "Keramos",
        qty: 32,
      },
      {
        name: "Third Age iron",
        qty: 30,
      },
    ],
    collections: ["Saradominist II", "Museum - Saradominist II"],
  },
  {
    name: "Dominion pelte shield",
    level: 61,
    experience: 2566.7,
    mats: [
      {
        name: "Star of Saradomin",
        qty: 34,
      },
      {
        name: "Samite silk",
        qty: 28,
      },
    ],
    collections: ["Saradominist II", "Museum - Saradominist II"],
  },
  {
    name: "Infula robes",
    level: 62,
    experience: 2800,
    mats: [
      {
        name: "Samite silk",
        qty: 26,
      },
      {
        name: "Leather scraps",
        qty: 12,
      },
      {
        name: "Goldrune",
        qty: 12,
      },
      {
        name: "Tyrian purple",
        qty: 12,
      },
    ],
    collections: ["Museum - Zarosian V", "Religious Iconography"],
  },
  {
    name: "Funerary urn of smoke",
    level: 62,
    experience: 2800,
    mats: [
      {
        name: "Soapstone",
        qty: 28,
      },
      {
        name: "Tyrian purple",
        qty: 14,
      },
      {
        name: "Ancient vis",
        qty: 20,
      },
    ],
    collections: ["Museum - Zarosian V", "Urns of the Empire"],
  },
  {
    name: "Hand of the Ancients",
    level: 62,
    experience: 2800,
    mats: [
      {
        name: "Blood of Orcus",
        qty: 12,
      },
      {
        name: "White oak",
        qty: 18,
      },
      {
        name: "Ancient vis",
        qty: 14,
      },
      {
        name: "Goldrune",
        qty: 18,
      },
    ],
    collections: ["Museum - Zarosian V", "Imperial Sorcery"],
  },
  {
    name: "Decorative amphora",
    level: 63,
    experience: 3033.3,
    mats: [
      {
        name: "Tyrian purple",
        qty: 16,
      },
      {
        name: "Ancient vis",
        qty: 18,
      },
      {
        name: "Soapstone",
        qty: 28,
      },
    ],
    collections: ["Museum - Zarosian VI", "Entertaining the Masses"],
  },
  {
    name: "Funerary urn of ice",
    level: 63,
    experience: 3033.3,
    mats: [
      {
        name: "Soapstone",
        qty: 28,
      },
      {
        name: "Tyrian purple",
        qty: 14,
      },
      {
        name: "Ancient vis",
        qty: 20,
      },
    ],
    collections: ["Museum - Zarosian VI", "Urns of the Empire"],
  },
  {
    name: "Loarnab rod",
    level: 63,
    experience: 3033.3,
    mats: [
      {
        name: "White oak",
        qty: 28,
      },
      {
        name: "Blood of Orcus",
        qty: 16,
      },
      {
        name: "Imperial steel",
        qty: 18,
      },
    ],
    collections: ["Museum - Zarosian VI", "Religious Iconography"],
  },
  {
    name: "Inquisitors ceremonial armour",
    level: 64,
    experience: 3266.7,
    mats: [
      {
        name: "Leather scraps",
        qty: 14,
      },
      {
        name: "Samite silk",
        qty: 30,
      },
      {
        name: "Tyrian purple",
        qty: 18,
      },
    ],
    collections: ["Finery of the Inquisition", "Museum - Zarosian VI"],
  },
  {
    name: "Inquisitors ceremonial mask",
    level: 64,
    experience: 3266.7,
    mats: [
      {
        name: "Ancient vis",
        qty: 14,
      },
      {
        name: "Leather scraps",
        qty: 12,
      },
      {
        name: "Blood of Orcus",
        qty: 14,
      },
      {
        name: "Samite silk",
        qty: 22,
      },
    ],
    collections: ["Finery of the Inquisition", "Museum - Zarosian VI"],
  },
  {
    name: "Inquisitors seal",
    level: 64,
    experience: 3266.7,
    mats: [
      {
        name: "Tyrian purple",
        qty: 14,
      },
      {
        name: "Zarosian insignia",
        qty: 20,
      },
      {
        name: "Ancient vis",
        qty: 14,
      },
      {
        name: "Goldrune",
        qty: 14,
      },
    ],
    collections: ["Finery of the Inquisition", "Museum - Zarosian VI"],
  },
  {
    name: "The Lake of Fire painting",
    level: 65,
    experience: 3500,
    mats: [
      {
        name: "Samite silk",
        qty: 10,
      },
      {
        name: "White oak",
        qty: 10,
      },
      {
        name: "Vellum",
        qty: 10,
      },
      {
        name: "Cadmium red",
        qty: 34,
      },
    ],
    collections: [
      "Anarchic Abstraction",
      "Zamorakian II",
      "Museum - Zamorakian II",
    ],
  },
  {
    name: "Lust metal sculpture",
    level: 65,
    experience: 3500,
    mats: [
      {
        name: "Third Age iron",
        qty: 16,
      },
      {
        name: "Eye of Dagon",
        qty: 24,
      },
      {
        name: "Goldrune",
        qty: 24,
      },
    ],
    collections: ["Showy Fings", "Zamorakian II", "Museum - Zamorakian II"],
  },
  {
    name: "Funerary urn of blood",
    level: 66,
    experience: 3773.3,
    mats: [
      {
        name: "Soapstone",
        qty: 30,
      },
      {
        name: "Tyrian purple",
        qty: 14,
      },
      {
        name: "Blood of Orcus",
        qty: 20,
      },
    ],
    collections: ["Museum - Zarosian VII", "Urns of the Empire"],
  },
  {
    name: "Gladiator helmet",
    level: 66,
    experience: 3773.3,
    mats: [
      {
        name: "Imperial steel",
        qty: 30,
      },
      {
        name: "Blood of Orcus",
        qty: 16,
      },
      {
        name: "Leather scraps",
        qty: 18,
      },
    ],
    collections: ["Entertaining the Masses", "Museum - Zarosian VII"],
  },
  {
    name: "Gladiator sword",
    level: 66,
    experience: 3773.3,
    mats: [
      {
        name: "Imperial steel",
        qty: 30,
      },
      {
        name: "Goldrune",
        qty: 18,
      },
      {
        name: "Zarosian insignia",
        qty: 16,
      },
    ],
    collections: ["Entertaining the Masses", "Museum - Zarosian VII"],
  },
  {
    name: "The Serpents Fall carving",
    level: 67,
    experience: 3966.7,
    mats: [
      {
        name: "Vellum",
        qty: 16,
      },
      {
        name: "Tyrian purple",
        qty: 24,
      },
      {
        name: "Blood of Orcus",
        qty: 12,
      },
      {
        name: "White oak",
        qty: 12,
      },
    ],
    collections: ["Museum - Zarosian VII", "Religious Iconography"],
  },
  {
    name: "Funerary urn of miasma",
    level: 67,
    experience: 3966.7,
    mats: [
      {
        name: "Soapstone",
        qty: 30,
      },
      {
        name: "Tyrian purple",
        qty: 14,
      },
      {
        name: "Ancient vis",
        qty: 20,
      },
    ],
    collections: ["Museum - Zarosian VII", "Urns of the Empire"],
  },
  {
    name: "Model chariot",
    level: 67,
    experience: 3966.7,
    mats: [
      {
        name: "Vellum",
        qty: 12,
      },
      {
        name: "Imperial steel",
        qty: 18,
      },
      {
        name: "Goldrune",
        qty: 20,
      },
      {
        name: "Zarosian insignia",
        qty: 14,
      },
    ],
    collections: ["Museum - Zarosian VII", "Religious Iconography"],
  },
  {
    name: "Chaos star",
    level: 68,
    experience: 4200,
    mats: [
      {
        name: "Chaotic brimstone",
        qty: 28,
      },
      {
        name: "Hellfire metal",
        qty: 36,
      },
    ],
    collections: ["Zamorakian II", "Museum - Zamorakian II"],
  },
  {
    name: "Spiked dog collar",
    level: 68,
    experience: 4200,
    mats: [
      {
        name: "Third Age iron",
        qty: 24,
      },
      {
        name: "Leather scraps",
        qty: 24,
      },
      {
        name: "Chaotic brimstone",
        qty: 16,
      },
    ],
    collections: ["Zamorakian II", "Museum - Zamorakian II"],
  },
  {
    name: "Bronze Dominion medal",
    level: 69,
    experience: 4433.3,
    mats: [
      {
        name: "Everlight silvthril",
        qty: 36,
      },
      {
        name: "Star of Saradomin",
        qty: 26,
      },
    ],
    collections: [
      "Blingy Fings",
      "Saradominist II",
      "Museum - Saradominist II",
    ],
  },
  {
    name: "Silver Dominion medal",
    level: 69,
    experience: 4433.3,
    mats: [
      {
        name: "Everlight silvthril",
        qty: 36,
      },
      {
        name: "Star of Saradomin",
        qty: 26,
      },
    ],
    collections: [
      "Blingy Fings",
      "Saradominist II",
      "Museum - Saradominist II",
    ],
  },
  {
    name: "Dominion torch",
    level: 69,
    experience: 4433.3,
    mats: [
      {
        name: "Goldrune",
        qty: 12,
      },
      {
        name: "Orthenglass",
        qty: 12,
      },
      {
        name: "Everlight silvthril",
        qty: 20,
      },
      {
        name: "Star of Saradomin",
        qty: 18,
      },
    ],
    collections: ["Smoky Fings", "Saradominist II", "Museum - Saradominist II"],
  },
  {
    name: "Ikovian gerege",
    level: 70,
    experience: 4666.7,
    mats: [
      {
        name: "Third Age iron",
        qty: 36,
      },
      {
        name: "Wings of War",
        qty: 30,
      },
    ],
    collections: [
      "Armadylean I",
      "Museum - Armadylean I",
      "Knowledge is Power",
    ],
  },
  {
    name: "Toy glider",
    level: 70,
    experience: 4666.7,
    mats: [
      {
        name: "Stormguard steel",
        qty: 36,
      },
      {
        name: "White oak",
        qty: 30,
      },
    ],
    collections: ["Armadylean I", "Museum - Armadylean I"],
  },
  {
    name: "Toy war golem",
    level: 70,
    experience: 4666.7,
    mats: [
      {
        name: "Third Age iron",
        qty: 36,
      },
      {
        name: "White oak",
        qty: 30,
      },
    ],
    collections: ["Armadylean I", "Museum - Armadylean I"],
  },
  {
    name: "Ceremonial dragonkin device",
    level: 70,
    experience: 4666.7,
    mats: [
      {
        name: "Orthenglass",
        qty: 66,
      },
    ],
    collections: ["Desperate for Artefacts"],
  },
  {
    name: "Decorative vase",
    level: 72,
    experience: 5133.3,
    mats: [
      {
        name: "White marble",
        qty: 36,
      },
      {
        name: "Cobalt blue",
        qty: 30,
      },
    ],
    collections: ["Saradominist II", "Museum - Saradominist II"],
  },
  {
    name: "Patera bowl",
    level: 72,
    experience: 5133.3,
    mats: [
      {
        name: "Keramos",
        qty: 36,
      },
      {
        name: "Goldrune",
        qty: 30,
      },
    ],
    collections: ["Saradominist II", "Museum - Saradominist II"],
  },
  {
    name: "Kantharos cup",
    level: 72,
    experience: 5133.3,
    mats: [
      {
        name: "Everlight silvthril",
        qty: 30,
      },
      {
        name: "Orthenglass",
        qty: 36,
      },
    ],
    collections: ["Saradominist II", "Museum - Saradominist II"],
  },
  {
    name: "Ceremonial mace",
    level: 74,
    experience: 5600,
    mats: [
      {
        name: "Imperial steel",
        qty: 20,
      },
      {
        name: "Third Age iron",
        qty: 20,
      },
      {
        name: "Goldrune",
        qty: 28,
      },
    ],
    collections: ["Hitty Fings", "Zarosian II", "Museum - Zarosian II"],
  },
  {
    name: "Consensus ad Idem painting",
    level: 74,
    experience: 5600,
    mats: [
      {
        name: "White oak",
        qty: 10,
      },
      {
        name: "Samite silk",
        qty: 10,
      },
      {
        name: "Tyrian purple",
        qty: 50,
      },
    ],
    collections: [
      "Imperial Impressionism",
      "Zarosian II",
      "Museum - Zarosian II",
    ],
  },
  {
    name: "Pontifex Maximus figurine",
    level: 74,
    experience: 5600,
    mats: [
      {
        name: "Zarosian insignia",
        qty: 24,
      },
      {
        name: "Ancient vis",
        qty: 16,
      },
      {
        name: "Goldrune",
        qty: 28,
      },
    ],
    collections: ["Showy Fings", "Zarosian II", "Museum - Zarosian II"],
  },
  {
    name: "Avian song-egg player",
    level: 76,
    experience: 6066.7,
    mats: [
      {
        name: "Stormguard steel",
        qty: 36,
      },
      {
        name: "Armadylean yellow",
        qty: 32,
      },
    ],
    collections: [
      "Armadylean I",
      "Museum - Armadylean I",
      "Wise Am the Music Man",
    ],
  },
  {
    name: "Keshik drum",
    level: 76,
    experience: 6066.7,
    mats: [
      {
        name: "Wings of War",
        qty: 16,
      },
      {
        name: "Animal furs",
        qty: 16,
      },
      {
        name: "White oak",
        qty: 20,
      },
      {
        name: "Leather scraps",
        qty: 16,
      },
    ],
    collections: [
      "Armadylean I",
      "Museum - Armadylean I",
      "Wise Am the Music Man",
    ],
  },
  {
    name: "Morin khuur",
    level: 76,
    experience: 6066.7,
    mats: [
      {
        name: "Armadylean yellow",
        qty: 36,
      },
      {
        name: "White oak",
        qty: 32,
      },
    ],
    collections: [
      "Armadylean I",
      "Museum - Armadylean I",
      "Wise Am the Music Man",
    ],
  },
  {
    name: "Ekeleshuun blinder mask",
    level: 76,
    experience: 6066.7,
    mats: [
      {
        name: "Vulcanised rubber",
        qty: 24,
      },
      {
        name: "Malachite green",
        qty: 20,
      },
      {
        name: "Vellum",
        qty: 24,
      },
    ],
    collections: [
      "Green Gobbo Goodies I",
      "Museum - Bandosian I",
      "Hat Problem",
    ],
  },
  {
    name: "Narogoshuun Hob-da-Gob ball",
    level: 76,
    experience: 6066.7,
    mats: [
      {
        name: "Vulcanised rubber",
        qty: 36,
      },
      {
        name: "Mark of the Kyzaj",
        qty: 32,
      },
    ],
    collections: ["Green Gobbo Goodies I", "Museum - Bandosian I"],
  },
  {
    name: "Rekeshuun war tether",
    level: 76,
    experience: 6066.7,
    mats: [
      {
        name: "Warforged bronze",
        qty: 20,
      },
      {
        name: "Vulcanised rubber",
        qty: 22,
      },
      {
        name: "Leather scraps",
        qty: 26,
      },
    ],
    collections: ["Green Gobbo Goodies I", "Museum - Bandosian I"],
  },
  {
    name: "Aviansie dreamcoat",
    level: 81,
    experience: 7388.9,
    mats: [
      {
        name: "Armadylean yellow",
        qty: 20,
      },
      {
        name: "Samite silk",
        qty: 30,
      },
      {
        name: "Animal furs",
        qty: 22,
      },
    ],
    collections: ["Armadylean I", "Museum - Armadylean I"],
  },
  {
    name: "Ceremonial plume",
    level: 81,
    experience: 7388.9,
    mats: [
      {
        name: "Armadylean yellow",
        qty: 38,
      },
      {
        name: "Goldrune",
        qty: 34,
      },
    ],
    collections: ["Showy Fings", "Armadylean I", "Museum - Armadylean I"],
  },
  {
    name: "Peacocking parasol",
    level: 81,
    experience: 7388.9,
    mats: [
      {
        name: "Armadylean yellow",
        qty: 22,
      },
      {
        name: "Samite silk",
        qty: 30,
      },
      {
        name: "White oak",
        qty: 20,
      },
    ],
    collections: ["Armadylean I", "Museum - Armadylean I"],
  },
  {
    name: "Ogre Kyzaj axe",
    level: 81,
    experience: 7388.9,
    mats: [
      {
        name: "Warforged bronze",
        qty: 28,
      },
      {
        name: "Mark of the Kyzaj",
        qty: 20,
      },
      {
        name: "Fossilised bone",
        qty: 24,
      },
    ],
    collections: ["Red Rum Relics I", "Museum - Bandosian I"],
  },
  {
    name: "Ork cleaver sword",
    level: 81,
    experience: 7388.9,
    mats: [
      {
        name: "Warforged bronze",
        qty: 36,
      },
      {
        name: "Fossilised bone",
        qty: 36,
      },
    ],
    collections: ["Red Rum Relics I", "Museum - Bandosian I"],
  },
  {
    name: "Larupia trophy",
    level: 81,
    experience: 7388.9,
    mats: [
      {
        name: "Cadmium red",
        qty: 18,
      },
      {
        name: "Animal furs",
        qty: 28,
      },
      {
        name: "Orthenglass",
        qty: 26,
      },
    ],
    collections: ["Zamorakian II", "Museum - Zamorakian II"],
  },
  {
    name: "Lion trophy",
    level: 81,
    experience: 7388.9,
    mats: [
      {
        name: "Cadmium red",
        qty: 18,
      },
      {
        name: "Animal furs",
        qty: 28,
      },
      {
        name: "White oak",
        qty: 26,
      },
    ],
    collections: ["Zamorakian II", "Museum - Zamorakian II"],
  },
  {
    name: "She-wolf trophy",
    level: 81,
    experience: 7388.9,
    mats: [
      {
        name: "Chaotic brimstone",
        qty: 26,
      },
      {
        name: "Cadmium red",
        qty: 18,
      },
      {
        name: "Animal furs",
        qty: 28,
      },
    ],
    collections: ["Zamorakian II", "Museum - Zamorakian II"],
  },
  {
    name: "Pontifex censer",
    level: 81,
    experience: 7388.9,
    mats: [
      {
        name: "Third Age iron",
        qty: 20,
      },
      {
        name: "Ancient vis",
        qty: 20,
      },
      {
        name: "Goldrune",
        qty: 32,
      },
    ],
    collections: ["Smoky Fings", "Zarosian II", "Museum - Zarosian II"],
  },
  {
    name: "Pontifex crozier",
    level: 81,
    experience: 7388.9,
    mats: [
      {
        name: "Imperial steel",
        qty: 20,
      },
      {
        name: "Zarosian insignia",
        qty: 20,
      },
      {
        name: "Goldrune",
        qty: 32,
      },
    ],
    collections: ["Hitty Fings", "Zarosian II", "Museum - Zarosian II"],
  },
  {
    name: "Pontifex mitre",
    level: 81,
    experience: 7388.9,
    mats: [
      {
        name: "Samite silk",
        qty: 32,
      },
      {
        name: "Ancient vis",
        qty: 20,
      },
      {
        name: "Zarosian insignia",
        qty: 20,
      },
    ],
    collections: ["Zarosian II", "Museum - Zarosian II", "Hat Hoarder"],
  },
  {
    name: "Thorobshuun battle standard",
    level: 83,
    experience: 8166.7,
    mats: [
      {
        name: "Mark of the Kyzaj",
        qty: 16,
      },
      {
        name: "Malachite green",
        qty: 22,
      },
      {
        name: "White oak",
        qty: 16,
      },
      {
        name: "Samite silk",
        qty: 20,
      },
    ],
    collections: ["Green Gobbo Goodies I", "Museum - Bandosian I"],
  },
  {
    name: "Yurkolgokh stink grenade",
    level: 83,
    experience: 8166.7,
    mats: [
      {
        name: "Yu'biusk clay",
        qty: 38,
      },
      {
        name: "Vulcanised rubber",
        qty: 36,
      },
    ],
    collections: ["Green Gobbo Goodies I", "Museum - Bandosian I"],
  },
  {
    name: "Dominarian device",
    level: 84,
    experience: 8555.6,
    mats: [
      {
        name: "Everlight silvthril",
        qty: 30,
      },
      {
        name: "Keramos",
        qty: 22,
      },
      {
        name: "Third Age iron",
        qty: 22,
      },
    ],
    collections: ["Saradominist III", "Museum - Saradominist III"],
  },
  {
    name: "Fishing trident",
    level: 84,
    experience: 8555.6,
    mats: [
      {
        name: "Star of Saradomin",
        qty: 22,
      },
      {
        name: "Third Age iron",
        qty: 30,
      },
      {
        name: "Goldrune",
        qty: 22,
      },
    ],
    collections: [
      "Hitty Fings",
      "Saradominist III",
      "Museum - Saradominist III",
    ],
  },
  {
    name: "Hawkeye lens multi-vision scope",
    level: 85,
    experience: 8944.4,
    mats: [
      {
        name: "Stormguard steel",
        qty: 40,
      },
      {
        name: "Orthenglass",
        qty: 34,
      },
    ],
    collections: ["Armadylean II", "Museum - Armadylean II"],
  },
  {
    name: "Talon-3 razor wing",
    level: 85,
    experience: 8944.4,
    mats: [
      {
        name: "Aetherium alloy",
        qty: 40,
      },
      {
        name: "Wings of War",
        qty: 34,
      },
    ],
    collections: ["Armadylean II", "Museum - Armadylean II"],
  },
  {
    name: "Necromantic focus",
    level: 86,
    experience: 9333.3,
    mats: [
      {
        name: "Imperial steel",
        qty: 20,
      },
      {
        name: "Blood of Orcus",
        qty: 26,
      },
      {
        name: "Ancient vis",
        qty: 30,
      },
    ],
    collections: [
      "Zarosian III",
      "Museum - Zarosian III",
      "Knowledge is Power",
      "Imperial Sorcery",
    ],
  },
  {
    name: "Exsanguinate spell scroll",
    level: 86,
    experience: 9333.3,
    mats: [
      {
        name: "Vellum",
        qty: 40,
      },
      {
        name: "Blood of Orcus",
        qty: 36,
      },
    ],
    collections: [
      "Zarosian III",
      "Museum - Zarosian III",
      "Magic Man",
      "Imperial Sorcery",
    ],
  },
  {
    name: "High priest crozier",
    level: 89,
    experience: 10500,
    mats: [
      {
        name: "Mark of the Kyzaj",
        qty: 26,
      },
      {
        name: "Malachite green",
        qty: 24,
      },
      {
        name: "Goldrune",
        qty: 28,
      },
    ],
    collections: [
      "Hitty Fings",
      "Green Gobbo Goodies II",
      "Museum - Bandosian I",
    ],
  },
  {
    name: "High priest mitre",
    level: 89,
    experience: 10500,
    mats: [
      {
        name: "Mark of the Kyzaj",
        qty: 26,
      },
      {
        name: "Malachite green",
        qty: 24,
      },
      {
        name: "Samite silk",
        qty: 28,
      },
    ],
    collections: [
      "Green Gobbo Goodies II",
      "Museum - Bandosian I",
      "Hat Problem",
      "Magic Man",
    ],
  },
  {
    name: "High priest orb",
    level: 89,
    experience: 10500,
    mats: [
      {
        name: "Mark of the Kyzaj",
        qty: 26,
      },
      {
        name: "Malachite green",
        qty: 24,
      },
      {
        name: "Goldrune",
        qty: 28,
      },
    ],
    collections: [
      "Hitty Fings",
      "Green Gobbo Goodies II",
      "Museum - Bandosian I",
    ],
  },
  {
    name: "Pandemonium tapestry",
    level: 89,
    experience: 10500,
    mats: [
      {
        name: "White oak",
        qty: 12,
      },
      {
        name: "Samite silk",
        qty: 12,
      },
      {
        name: "Vellum",
        qty: 12,
      },
      {
        name: "Cadmium red",
        qty: 42,
      },
    ],
    collections: [
      "Anarchic Abstraction",
      "Zamorakian III",
      "Museum - Zamorakian III",
    ],
  },
  {
    name: "Torment metal sculpture",
    level: 89,
    experience: 10500,
    mats: [
      {
        name: "Eye of Dagon",
        qty: 20,
      },
      {
        name: "Third Age iron",
        qty: 20,
      },
      {
        name: "Hellfire metal",
        qty: 38,
      },
    ],
    collections: ["Zamorakian III", "Museum - Zamorakian III"],
  },
  {
    name: "Ceremonial dragonkin tablet",
    level: 90,
    experience: 10888.9,
    mats: [
      {
        name: "Orthenglass",
        qty: 79,
      },
    ],
    collections: ["Desperate for Artefacts"],
  },
  {
    name: "Pasaha",
    level: 90,
    experience: 10888.9,
    mats: [
      {
        name: "Felt",
        qty: 40,
      },
      {
        name: "Goldrune",
        qty: 38,
      },
    ],
    collections: ["Dragonkin I", "Museum - Dragonkin I"],
  },
  {
    name: "Ritual bell",
    level: 90,
    experience: 10888.9,
    mats: [
      {
        name: "Goldrune",
        qty: 40,
      },
      {
        name: "Compass rose",
        qty: 38,
      },
    ],
    collections: ["Dragonkin I", "Museum - Dragonkin I"],
  },
  {
    name: "Prototype gravimeter",
    level: 91,
    experience: 11277.8,
    mats: [
      {
        name: "Quintessence",
        qty: 34,
      },
      {
        name: "Leather scraps",
        qty: 20,
      },
      {
        name: "Third Age iron",
        qty: 26,
      },
    ],
    collections: ["Armadylean II", "Museum - Armadylean II"],
  },
  {
    name: "Songbird recorder",
    level: 91,
    experience: 11277.8,
    mats: [
      {
        name: "Stormguard steel",
        qty: 44,
      },
      {
        name: "Orthenglass",
        qty: 36,
      },
    ],
    collections: [
      "Armadylean II",
      "Museum - Armadylean II",
      "Wise Am the Music Man",
    ],
  },
  {
    name: "Amphora",
    level: 92,
    experience: 11666.7,
    mats: [
      {
        name: "Everlight silvthril",
        qty: 34,
      },
      {
        name: "Keramos",
        qty: 46,
      },
    ],
    collections: ["Saradominist III", "Museum - Saradominist III"],
  },
  {
    name: "Rod of Asclepius",
    level: 92,
    experience: 11666.7,
    mats: [
      {
        name: "White marble",
        qty: 30,
      },
      {
        name: "Star of Saradomin",
        qty: 24,
      },
      {
        name: "Goldrune",
        qty: 26,
      },
    ],
    collections: [
      "Showy Fings",
      "Saradominist III",
      "Museum - Saradominist III",
    ],
  },
  {
    name: "Zarosian ewer",
    level: 93,
    experience: 12500,
    mats: [
      {
        name: "Third Age iron",
        qty: 52,
      },
      {
        name: "Zarosian insignia",
        qty: 30,
      },
    ],
    collections: ["Zarosian III", "Museum - Zarosian III"],
  },
  {
    name: "Zarosian stein",
    level: 93,
    experience: 12500,
    mats: [
      {
        name: "Third Age iron",
        qty: 16,
      },
      {
        name: "Imperial steel",
        qty: 36,
      },
      {
        name: "Zarosian insignia",
        qty: 30,
      },
    ],
    collections: ["Zarosian III", "Museum - Zarosian III"],
  },
  {
    name: "Beastkeeper helm",
    level: 94,
    experience: 13333.3,
    mats: [
      {
        name: "Warforged bronze",
        qty: 16,
      },
      {
        name: "Vulcanised rubber",
        qty: 24,
      },
      {
        name: "Animal furs",
        qty: 20,
      },
      {
        name: "Fossilised bone",
        qty: 24,
      },
    ],
    collections: ["Red Rum Relics I", "Museum - Bandosian II", "Hat Problem"],
  },
  {
    name: "Idithuun horn ring",
    level: 94,
    experience: 13333.3,
    mats: [
      {
        name: "Yu'biusk clay",
        qty: 40,
      },
      {
        name: "Vulcanised rubber",
        qty: 44,
      },
    ],
    collections: ["Green Gobbo Goodies II", "Museum - Bandosian II"],
  },
  {
    name: "Nosorog! sculpture",
    level: 94,
    experience: 13333.3,
    mats: [
      {
        name: "Yu'biusk clay",
        qty: 30,
      },
      {
        name: "Malachite green",
        qty: 24,
      },
      {
        name: "Warforged bronze",
        qty: 30,
      },
    ],
    collections: ["Red Rum Relics I", "Museum - Bandosian II"],
  },
  {
    name: "Stormguard gerege",
    level: 95,
    experience: 14166.7,
    mats: [
      {
        name: "Stormguard steel",
        qty: 36,
      },
      {
        name: "Wings of War",
        qty: 28,
      },
      {
        name: "Goldrune",
        qty: 20,
      },
    ],
    collections: ["Armadylean II", "Museum - Armadylean II"],
  },
  {
    name: "Dayguard shield",
    level: 95,
    experience: 14166.7,
    mats: [
      {
        name: "Stormguard steel",
        qty: 36,
      },
      {
        name: "Wings of War",
        qty: 28,
      },
      {
        name: "White oak",
        qty: 20,
      },
    ],
    collections: ["Armadylean II", "Museum - Armadylean II"],
  },
  {
    name: "Kilaya",
    level: 96,
    experience: 15000,
    mats: [
      {
        name: "Dragon metal",
        qty: 46,
      },
      {
        name: "Compass rose",
        qty: 40,
      },
    ],
    collections: ["Dragonkin I", "Museum - Dragonkin I"],
  },
  {
    name: "Vazara",
    level: 96,
    experience: 15000,
    mats: [
      {
        name: "Dragon metal",
        qty: 30,
      },
      {
        name: "Compass rose",
        qty: 28,
      },
      {
        name: "Goldrune",
        qty: 28,
      },
    ],
    collections: ["Dragonkin I", "Museum - Dragonkin I"],
  },
  {
    name: "Garagorshuun anchor",
    level: 97,
    experience: 15833.3,
    mats: [
      {
        name: "Warforged bronze",
        qty: 32,
      },
      {
        name: "Mark of the Kyzaj",
        qty: 26,
      },
      {
        name: "Third Age iron",
        qty: 30,
      },
    ],
    collections: ["Green Gobbo Goodies II", "Museum - Bandosian II"],
  },
  {
    name: "Ourg megahitter",
    level: 97,
    experience: 15833.3,
    mats: [
      {
        name: "White oak",
        qty: 20,
      },
      {
        name: "Leather scraps",
        qty: 20,
      },
      {
        name: "Orthenglass",
        qty: 26,
      },
      {
        name: "Malachite green",
        qty: 22,
      },
    ],
    collections: ["Red Rum Relics II", "Museum - Bandosian II"],
  },
  {
    name: "Ourg tower/goblin cower shield",
    level: 97,
    experience: 15833.3,
    mats: [
      {
        name: "Mark of the Kyzaj",
        qty: 20,
      },
      {
        name: "Third Age iron",
        qty: 26,
      },
      {
        name: "Leather scraps",
        qty: 22,
      },
      {
        name: "White oak",
        qty: 20,
      },
    ],
    collections: ["Museum - Bandosian II", "Red Rum Relics II"],
  },
  {
    name: "Golem heart",
    level: 98,
    experience: 16666.7,
    mats: [
      {
        name: "Aetherium alloy",
        qty: 34,
      },
      {
        name: "Quintessence",
        qty: 24,
      },
      {
        name: "Orthenglass",
        qty: 16,
      },
      {
        name: "Soapstone",
        qty: 16,
      },
    ],
    collections: ["Armadylean II", "Museum - Armadylean II"],
  },
  {
    name: "Golem instruction",
    level: 98,
    experience: 16666.7,
    mats: [
      {
        name: "Quintessence",
        qty: 46,
      },
      {
        name: "Vellum",
        qty: 44,
      },
    ],
    collections: [
      "Armadylean II",
      "Knowledge is Power",
      "Museum - Armadylean II",
    ],
  },
  {
    name: "Hellfire haladie",
    level: 98,
    experience: 16666.7,
    mats: [
      {
        name: "Hellfire metal",
        qty: 44,
      },
      {
        name: "Third Age iron",
        qty: 26,
      },
      {
        name: "Leather scraps",
        qty: 20,
      },
    ],
    collections: ["Museum - Zamorakian III", "Zamorakian III"],
  },
  {
    name: "Hellfire katar",
    level: 98,
    experience: 16666.7,
    mats: [
      {
        name: "Hellfire metal",
        qty: 50,
      },
      {
        name: "Leather scraps",
        qty: 40,
      },
    ],
    collections: ["Museum - Zamorakian III", "Zamorakian III"],
  },
  {
    name: "Hellfire zaghnal",
    level: 98,
    experience: 16666.7,
    mats: [
      {
        name: "Hellfire metal",
        qty: 38,
      },
      {
        name: "White oak",
        qty: 26,
      },
      {
        name: "Orthenglass",
        qty: 26,
      },
    ],
    collections: ["Museum - Zamorakian III", "Zamorakian III"],
  },
  {
    name: "Death mask",
    level: 99,
    experience: 17500,
    mats: [
      {
        name: "Orgone",
        qty: 56,
      },
      {
        name: "Soapstone",
        qty: 34,
      },
    ],
    collections: ["Dragonkin I", "Museum - Dragonkin I"],
  },
  {
    name: "Dragonkin calendar",
    level: 99,
    experience: 17500,
    mats: [
      {
        name: "Orgone",
        qty: 34,
      },
      {
        name: "Carbon black",
        qty: 28,
      },
      {
        name: "Compass rose",
        qty: 28,
      },
    ],
    collections: ["Dragonkin I", "Museum - Dragonkin I"],
  },
  {
    name: "Dragonkin staff",
    level: 99,
    experience: 17500,
    mats: [
      {
        name: "Orgone",
        qty: 56,
      },
      {
        name: "Compass rose",
        qty: 34,
      },
    ],
    collections: ["Dragonkin I", "Museum - Dragonkin I"],
  },
  {
    name: "Dorgeshuun spear",
    level: 100,
    experience: 18666.7,
    mats: [
      {
        name: "Warforged bronze",
        qty: 50,
      },
      {
        name: "White oak",
        qty: 42,
      },
    ],
    collections: ["Museum - Bandosian II", "Green Gobbo Goodies III"],
  },
  {
    name: "Forged in War sculpture",
    level: 100,
    experience: 18666.7,
    mats: [
      {
        name: "Warforged bronze",
        qty: 50,
      },
      {
        name: "Yu'biusk clay",
        qty: 42,
      },
    ],
    collections: ["Museum - Bandosian II", "Red Rum Relics II"],
  },
  {
    name: "Kopis dagger",
    level: 100,
    experience: 18666.7,
    mats: [
      {
        name: "Everlight silvthril",
        qty: 50,
      },
      {
        name: "Leather scraps",
        qty: 42,
      },
    ],
    collections: ["Museum - Saradominist III", "Saradominist III"],
  },
  {
    name: "Xiphos short sword",
    level: 100,
    experience: 18666.7,
    mats: [
      {
        name: "Everlight silvthril",
        qty: 46,
      },
      {
        name: "Leather scraps",
        qty: 46,
      },
    ],
    collections: ["Museum - Saradominist III", "Saradominist III"],
  },
  {
    name: "Smoke Cloud spell scroll",
    level: 100,
    experience: 18666.7,
    mats: [
      {
        name: "Vellum",
        qty: 40,
      },
      {
        name: "Ancient vis",
        qty: 20,
      },
      {
        name: "Blood of Orcus",
        qty: 32,
      },
    ],
    collections: [
      "Magic Man",
      "Museum - Zarosian III",
      "Zarosian III",
      "Imperial Sorcery",
    ],
  },
  {
    name: "Vigorem vial",
    level: 100,
    experience: 18666.7,
    mats: [
      {
        name: "Imperial steel",
        qty: 54,
      },
      {
        name: "Ancient vis",
        qty: 38,
      },
    ],
    collections: ["Museum - Zarosian III", "Zarosian III"],
  },
  {
    name: "Dragon scalpel",
    level: 101,
    experience: 19833.3,
    mats: [
      {
        name: "Dragon metal",
        qty: 52,
      },
      {
        name: "Felt",
        qty: 42,
      },
    ],
    collections: ["Dragonkin II", "Museum - Dragonkin II"],
  },
  {
    name: "Protective goggles",
    level: 101,
    experience: 19833.3,
    mats: [
      {
        name: "Felt",
        qty: 42,
      },
      {
        name: "Orthenglass",
        qty: 52,
      },
    ],
    collections: ["Dragonkin II", "Museum - Dragonkin II"],
  },
  {
    name: "Dragon burner",
    level: 102,
    experience: 21000,
    mats: [
      {
        name: "Dragon metal",
        qty: 52,
      },
      {
        name: "Orgone",
        qty: 42,
      },
    ],
    collections: ["Dragonkin II", "Museum - Dragonkin II"],
  },
  {
    name: "Orthenglass flask",
    level: 102,
    experience: 21000,
    mats: [
      {
        name: "Dragon metal",
        qty: 34,
      },
      {
        name: "Orthenglass",
        qty: 60,
      },
    ],
    collections: ["Dragonkin II", "Museum - Dragonkin II"],
  },
  {
    name: "Blackfire lance",
    level: 103,
    experience: 22166.7,
    mats: [
      {
        name: "Aetherium alloy",
        qty: 50,
      },
      {
        name: "Quintessence",
        qty: 46,
      },
    ],
    collections: ["Armadylean III", "Museum - Armadylean III"],
  },
  {
    name: "Nightguard shield",
    level: 103,
    experience: 22166.7,
    mats: [
      {
        name: "Stormguard steel",
        qty: 30,
      },
      {
        name: "Wings of War",
        qty: 36,
      },
      {
        name: "White oak",
        qty: 30,
      },
    ],
    collections: ["Armadylean III", "Museum - Armadylean III"],
  },
  {
    name: "Huzamogaarb chaos crown",
    level: 104,
    experience: 23333.3,
    mats: [
      {
        name: "Warforged bronze",
        qty: 44,
      },
      {
        name: "Third Age iron",
        qty: 34,
      },
      {
        name: "Eye of Dagon",
        qty: 20,
      },
    ],
    collections: [
      "Green Gobbo Goodies III",
      "Hat Problem",
      "Museum - Bandosian III",
    ],
  },
  {
    name: "Saragorgak star crown",
    level: 104,
    experience: 23333.3,
    mats: [
      {
        name: "Warforged bronze",
        qty: 44,
      },
      {
        name: "Third Age iron",
        qty: 34,
      },
      {
        name: "Star of Saradomin",
        qty: 20,
      },
    ],
    collections: [
      "Green Gobbo Goodies III",
      "Hat Hoarder",
      "Museum - Bandosian III",
    ],
  },
  {
    name: "Possession metal sculpture",
    level: 104,
    experience: 23333.3,
    mats: [
      {
        name: "Eye of Dagon",
        qty: 24,
      },
      {
        name: "Chaotic brimstone",
        qty: 30,
      },
      {
        name: "Third Age iron",
        qty: 44,
      },
    ],
    collections: ["Museum - Zamorakian III", "Zamorakian III"],
  },
  {
    name: "Trishula",
    level: 104,
    experience: 23333.3,
    mats: [
      {
        name: "Hellfire metal",
        qty: 48,
      },
      {
        name: "Eye of Dagon",
        qty: 30,
      },
      {
        name: "Third Age iron",
        qty: 20,
      },
    ],
    collections: ["Museum - Zamorakian III", "Zamorakian III"],
  },
  {
    name: "Tsutsaroth piercing",
    level: 104,
    experience: 23333.3,
    mats: [
      {
        name: "Hellfire metal",
        qty: 44,
      },
      {
        name: "Chaotic brimstone",
        qty: 30,
      },
      {
        name: "Cadmium red",
        qty: 24,
      },
    ],
    collections: ["Museum - Zamorakian III", "Zamorakian III"],
  },
  {
    name: "The Pride of Padosan painting",
    level: 105,
    experience: 24500,
    mats: [
      {
        name: "Cobalt blue",
        qty: 52,
      },
      {
        name: "White oak",
        qty: 16,
      },
      {
        name: "Samite silk",
        qty: 16,
      },
      {
        name: "Vellum",
        qty: 16,
      },
    ],
    collections: [
      "Museum - Saradominist IV",
      "Radiant Renaissance",
      "Saradominist IV",
    ],
  },
  {
    name: "Hallowed Be the Everlight painting",
    level: 105,
    experience: 24500,
    mats: [
      {
        name: "Cobalt blue",
        qty: 52,
      },
      {
        name: "White oak",
        qty: 16,
      },
      {
        name: "Samite silk",
        qty: 16,
      },
      {
        name: "Vellum",
        qty: 16,
      },
    ],
    collections: [
      "Museum - Saradominist IV",
      "Radiant Renaissance",
      "Saradominist IV",
    ],
  },
  {
    name: "The Lord of Light painting",
    level: 105,
    experience: 24500,
    mats: [
      {
        name: "Cobalt blue",
        qty: 52,
      },
      {
        name: "White oak",
        qty: 16,
      },
      {
        name: "Samite silk",
        qty: 16,
      },
      {
        name: "Vellum",
        qty: 16,
      },
    ],
    collections: [
      "Museum - Saradominist IV",
      "Radiant Renaissance",
      "Saradominist IV",
    ],
  },
  {
    name: "Meditation pipe",
    level: 106,
    experience: 25666.7,
    mats: [
      {
        name: "Orgone",
        qty: 60,
      },
      {
        name: "Dragon metal",
        qty: 40,
      },
    ],
    collections: ["Dragonkin III", "Museum - Dragonkin III"],
  },
  {
    name: "Personal totem",
    level: 106,
    experience: 25666.7,
    mats: [
      {
        name: "Orgone",
        qty: 48,
      },
      {
        name: "Carbon black",
        qty: 26,
      },
      {
        name: "Compass rose",
        qty: 26,
      },
    ],
    collections: ["Dragonkin III", "Museum - Dragonkin III"],
  },
  {
    name: "Singing bowl",
    level: 106,
    experience: 25666.7,
    mats: [
      {
        name: "Orgone",
        qty: 60,
      },
      {
        name: "Dragon metal",
        qty: 40,
      },
    ],
    collections: ["Dragonkin III", "Museum - Dragonkin III"],
  },
  {
    name: "Ancient magic tablet",
    level: 107,
    experience: 27000,
    mats: [
      {
        name: "Ancient vis",
        qty: 40,
      },
      {
        name: "Blood of Orcus",
        qty: 64,
      },
    ],
    collections: ["Museum - Zarosian III", "Zarosian III", "Imperial Sorcery"],
  },
  {
    name: "Portable phylactery",
    level: 107,
    experience: 27000,
    mats: [
      {
        name: "Imperial steel",
        qty: 48,
      },
      {
        name: "Blood of Orcus",
        qty: 36,
      },
      {
        name: "Ancient vis",
        qty: 20,
      },
    ],
    collections: ["Magic Man", "Museum - Zarosian III", "Zarosian III"],
  },
  {
    name: "Animate Dead spell scroll",
    level: 107,
    experience: 27000,
    mats: [
      {
        name: "Vellum",
        qty: 40,
      },
      {
        name: "Ancient vis",
        qty: 24,
      },
      {
        name: "Blood of Orcus",
        qty: 40,
      },
    ],
    collections: [
      "Magic Man",
      "Museum - Zarosian III",
      "Zarosian III",
      "Imperial Sorcery",
    ],
  },
  {
    name: "Lingam stone",
    level: 108,
    experience: 28333.3,
    mats: [
      {
        name: "Orgone",
        qty: 44,
      },
      {
        name: "Carbon black",
        qty: 30,
      },
      {
        name: "Compass rose",
        qty: 32,
      },
    ],
    collections: ["Dragonkin III", "Museum - Dragonkin III"],
  },
  {
    name: "Master control",
    level: 108,
    experience: 28333.3,
    mats: [
      {
        name: "Orgone",
        qty: 30,
      },
      {
        name: "Carbon black",
        qty: 32,
      },
      {
        name: "Compass rose",
        qty: 44,
      },
    ],
    collections: ["Dragonkin III", "Museum - Dragonkin III"],
  },
  {
    name: "The Enlightened Soul scroll",
    level: 109,
    experience: 29666.7,
    mats: [
      {
        name: "Star of Saradomin",
        qty: 50,
      },
      {
        name: "Vellum",
        qty: 60,
      },
    ],
    collections: [
      "Knowledge is Power",
      "Museum - Saradominist IV",
      "Saradominist IV",
    ],
  },
  {
    name: "The Eudoxian Elements tablet",
    level: 109,
    experience: 29666.7,
    mats: [
      {
        name: "White marble",
        qty: 60,
      },
      {
        name: "Goldrune",
        qty: 50,
      },
    ],
    collections: [
      "Knowledge is Power",
      "Museum - Saradominist IV",
      "Saradominist IV",
    ],
  },
  {
    name: "Drogokishuun hook sword",
    level: 110,
    experience: 31000,
    mats: [
      {
        name: "Warforged bronze",
        qty: 44,
      },
      {
        name: "Malachite green",
        qty: 36,
      },
      {
        name: "Fossilised bone",
        qty: 32,
      },
    ],
    collections: ["Green Gobbo Goodies III", "Museum - Bandosian III"],
  },
  {
    name: "Hobgoblin mansticker",
    level: 110,
    experience: 31000,
    mats: [
      {
        name: "Warforged bronze",
        qty: 66,
      },
      {
        name: "Fossilised bone",
        qty: 46,
      },
    ],
    collections: ["Museum - Bandosian III", "Red Rum Relics II"],
  },
  {
    name: "Chaos Elemental trophy",
    level: 110,
    experience: 31000,
    mats: [
      {
        name: "Chaotic brimstone",
        qty: 52,
      },
      {
        name: "White oak",
        qty: 30,
      },
      {
        name: "Hellfire metal",
        qty: 30,
      },
    ],
    collections: ["Museum - Zamorakian IV", "Zamorakian IV"],
  },
  {
    name: "Virius trophy",
    level: 110,
    experience: 31000,
    mats: [
      {
        name: "Demonhide",
        qty: 44,
      },
      {
        name: "White oak",
        qty: 34,
      },
      {
        name: "Orthenglass",
        qty: 34,
      },
    ],
    collections: ["Museum - Zamorakian IV", "Zamorakian IV"],
  },
  {
    name: "Flat cap",
    level: 111,
    experience: 32333.3,
    mats: [
      {
        name: "Armadylean yellow",
        qty: 60,
      },
      {
        name: "Samite silk",
        qty: 54,
      },
    ],
    collections: ["Armadylean III", "Hat Problem", "Museum - Armadylean III"],
  },
  {
    name: "Night owl flight goggles",
    level: 111,
    experience: 32333.3,
    mats: [
      {
        name: "Armadylean yellow",
        qty: 44,
      },
      {
        name: "Leather scraps",
        qty: 40,
      },
      {
        name: "Orthenglass",
        qty: 30,
      },
    ],
    collections: ["Armadylean III", "Museum - Armadylean III"],
  },
  {
    name: "Prototype godbow",
    level: 112,
    experience: 33666.7,
    mats: [
      {
        name: "Aetherium alloy",
        qty: 50,
      },
      {
        name: "Quintessence",
        qty: 34,
      },
      {
        name: "Wings of War",
        qty: 34,
      },
    ],
    collections: ["Armadylean III", "Museum - Armadylean III"],
  },
  {
    name: "Prototype godstaff",
    level: 112,
    experience: 33666.7,
    mats: [
      {
        name: "Aetherium alloy",
        qty: 50,
      },
      {
        name: "Quintessence",
        qty: 34,
      },
      {
        name: "Wings of War",
        qty: 34,
      },
    ],
    collections: ["Armadylean III", "Museum - Armadylean III"],
  },
  {
    name: "Prototype godsword",
    level: 112,
    experience: 33666.7,
    mats: [
      {
        name: "Aetherium alloy",
        qty: 50,
      },
      {
        name: "Wings of War",
        qty: 34,
      },
      {
        name: "Goldrune",
        qty: 34,
      },
    ],
    collections: ["Armadylean III", "Museum - Armadylean III"],
  },
  {
    name: "Xolo hard hat",
    level: 113,
    experience: 35000,
    mats: [
      {
        name: "Goldrune",
        qty: 54,
      },
      {
        name: "Dragon metal",
        qty: 66,
      },
    ],
    collections: ["Dragonkin IV", "Museum - Dragonkin IV"],
  },
  {
    name: "Xolo pickaxe",
    level: 113,
    experience: 35000,
    mats: [
      {
        name: "Goldrune",
        qty: 36,
      },
      {
        name: "Dragon metal",
        qty: 50,
      },
      {
        name: "Orgone",
        qty: 34,
      },
    ],
    collections: ["Dragonkin IV", "Museum - Dragonkin IV"],
  },
  {
    name: "Praetorian hood",
    level: 114,
    experience: 36666.7,
    mats: [
      {
        name: "Ancient vis",
        qty: 36,
      },
      {
        name: "Samite silk",
        qty: 48,
      },
      {
        name: "Zarosian insignia",
        qty: 40,
      },
      {
        name: "Death rune",
        qty: 30,
      },
    ],
    collections: ["Hat Problem", "Museum - Zarosian IV", "Zarosian IV"],
  },
  {
    name: "Praetorian robes",
    level: 114,
    experience: 36666.7,
    mats: [
      {
        name: "Ancient vis",
        qty: 30,
      },
      {
        name: "Samite silk",
        qty: 54,
      },
      {
        name: "Zarosian insignia",
        qty: 40,
      },
      {
        name: "Death rune",
        qty: 50,
      },
    ],
    collections: ["Museum - Zarosian IV", "Zarosian IV"],
  },
  {
    name: "Praetorian staff",
    level: 114,
    experience: 36666.7,
    mats: [
      {
        name: "Imperial steel",
        qty: 36,
      },
      {
        name: "Ancient vis",
        qty: 58,
      },
      {
        name: "Zarosian insignia",
        qty: 30,
      },
      {
        name: "Death rune",
        qty: 100,
      },
    ],
    collections: ["Museum - Zarosian IV", "Zarosian IV"],
  },
  {
    name: "Kal-i-kra chieftain crown",
    level: 115,
    experience: 38333.3,
    mats: [
      {
        name: "Yu'biusk clay",
        qty: 66,
      },
      {
        name: "Animal furs",
        qty: 60,
      },
    ],
    collections: [
      "Hat Hoarder",
      "Museum - Bandosian III",
      "Red Rum Relics III",
    ],
  },
  {
    name: "Kal-i-kra mace",
    level: 115,
    experience: 38333.3,
    mats: [
      {
        name: "Vulcanised rubber",
        qty: 42,
      },
      {
        name: "Third Age iron",
        qty: 44,
      },
      {
        name: "Fossilised bone",
        qty: 40,
      },
    ],
    collections: ["Museum - Bandosian III", "Red Rum Relics III"],
  },
  {
    name: "Kal-i-kra warhorn",
    level: 115,
    experience: 38333.3,
    mats: [
      {
        name: "Vulcanised rubber",
        qty: 44,
      },
      {
        name: "Fossilised bone",
        qty: 42,
      },
      {
        name: "Animal furs",
        qty: 40,
      },
    ],
    collections: ["Museum - Bandosian III", "Red Rum Relics III"],
  },
  {
    name: "Spear of Annihilation",
    level: 115,
    experience: 38333.3,
    mats: [
      {
        name: "Vulcanised rubber",
        qty: 500,
      },
      {
        name: "Malachite green",
        qty: 500,
      },
      {
        name: "Goldrune",
        qty: 500,
      },
    ],
    collections: ["Other"],
  },
  {
    name: "Tsutsaroth helm",
    level: 116,
    experience: 40000,
    mats: [
      {
        name: "Hellfire metal",
        qty: 50,
      },
      {
        name: "Eye of Dagon",
        qty: 40,
      },
      {
        name: "Goldrune",
        qty: 40,
      },
    ],
    collections: ["Hat Hoarder", "Museum - Zamorakian IV", "Zamorakian IV"],
  },
  {
    name: "Tsutsaroth pauldron",
    level: 116,
    experience: 40000,
    mats: [
      {
        name: "Hellfire metal",
        qty: 40,
      },
      {
        name: "Goldrune",
        qty: 50,
      },
      {
        name: "Eye of Dagon",
        qty: 40,
      },
    ],
    collections: ["Museum - Zamorakian IV", "Zamorakian IV"],
  },
  {
    name: "Tsutsaroth urumi",
    level: 116,
    experience: 40000,
    mats: [
      {
        name: "Hellfire metal",
        qty: 50,
      },
      {
        name: "Eye of Dagon",
        qty: 40,
      },
      {
        name: "Third Age iron",
        qty: 40,
      },
    ],
    collections: ["Museum - Zamorakian IV", "Zamorakian IV"],
  },
  {
    name: "Kontos lance",
    level: 117,
    experience: 41666.7,
    mats: [
      {
        name: "Everlight silvthril",
        qty: 70,
      },
      {
        name: "Samite silk",
        qty: 62,
      },
    ],
    collections: ["Museum - Saradominist IV", "Saradominist IV"],
  },
  {
    name: "Doru spear",
    level: 117,
    experience: 41666.7,
    mats: [
      {
        name: "Everlight silvthril",
        qty: 70,
      },
      {
        name: "White oak",
        qty: 62,
      },
    ],
    collections: ["Museum - Saradominist IV", "Saradominist IV"],
  },
  {
    name: "Chuluu stone",
    level: 118,
    experience: 43333.3,
    mats: [
      {
        name: "Aetherium alloy",
        qty: 40,
      },
      {
        name: "Quintessence",
        qty: 30,
      },
      {
        name: "Soapstone",
        qty: 40,
      },
      {
        name: "Goldrune",
        qty: 24,
      },
    ],
    collections: ["Armadylean III", "Magic Man", "Museum - Armadylean III"],
  },
  {
    name: "Quintessence counter",
    level: 118,
    experience: 43333.3,
    mats: [
      {
        name: "Quintessence",
        qty: 54,
      },
      {
        name: "Stormguard steel",
        qty: 40,
      },
      {
        name: "White oak",
        qty: 40,
      },
    ],
    collections: ["Armadylean III", "Museum - Armadylean III"],
  },
  {
    name: "Spherical astrolabe",
    level: 118,
    experience: 43333.3,
    mats: [
      {
        name: "Aetherium alloy",
        qty: 46,
      },
      {
        name: "Armadylean yellow",
        qty: 40,
      },
      {
        name: "Orthenglass",
        qty: 48,
      },
    ],
    collections: ["Armadylean III", "Museum - Armadylean III"],
  },
  {
    name: "Ancient globe",
    level: 118,
    experience: 43333.3,
    mats: [
      {
        name: "White oak",
        qty: 20,
      },
      {
        name: "Tyrian purple",
        qty: 54,
      },
      {
        name: "Ancient vis",
        qty: 60,
      },
    ],
    collections: ["Museum - Zarosian IV", "Zarosian IV"],
  },
  {
    name: "Battle plans",
    level: 118,
    experience: 43333.3,
    mats: [
      {
        name: "Vellum",
        qty: 40,
      },
      {
        name: "Tyrian purple",
        qty: 60,
      },
      {
        name: "Ancient vis",
        qty: 34,
      },
    ],
    collections: ["Museum - Zarosian IV", "Zarosian IV"],
  },
  {
    name: "Prima Legio painting",
    level: 118,
    experience: 43333.3,
    mats: [
      {
        name: "White oak",
        qty: 20,
      },
      {
        name: "Samite silk",
        qty: 20,
      },
      {
        name: "Tyrian purple",
        qty: 74,
      },
      {
        name: "Zarosian insignia",
        qty: 20,
      },
    ],
    collections: [
      "Imperial Impressionism",
      "Museum - Zarosian IV",
      "Zarosian IV",
    ],
  },
  {
    name: "Horogothgar cooking pot",
    level: 119,
    experience: 45000,
    mats: [
      {
        name: "Yu'biusk clay",
        qty: 60,
      },
      {
        name: "Malachite green",
        qty: 38,
      },
      {
        name: "Soapstone",
        qty: 40,
      },
    ],
    collections: ["Green Gobbo Goodies III", "Museum - Bandosian III"],
  },
  {
    name: "Da Boss Man sculpture",
    level: 119,
    experience: 45000,
    mats: [
      {
        name: "Yu'biusk clay",
        qty: 50,
      },
      {
        name: "Malachite green",
        qty: 44,
      },
      {
        name: "Soapstone",
        qty: 44,
      },
    ],
    collections: [
      "Green Gobbo Goodies III",
      "Knowledge is Power",
      "Museum - Bandosian III",
      "Red Rum Relics III",
    ],
  },
  {
    name: "Xolo shield",
    level: 119,
    experience: 45000,
    mats: [
      {
        name: "Goldrune",
        qty: 52,
      },
      {
        name: "Orgone",
        qty: 44,
      },
      {
        name: "Felt",
        qty: 42,
      },
    ],
    collections: ["Dragonkin IV", "Museum - Dragonkin IV"],
  },
  {
    name: "Xolo spear",
    level: 119,
    experience: 45000,
    mats: [
      {
        name: "Dragon metal",
        qty: 74,
      },
      {
        name: "Orgone",
        qty: 64,
      },
    ],
    collections: ["Dragonkin IV", "Museum - Dragonkin IV"],
  },
  {
    name: "Gold dish",
    level: 120,
    experience: 46666.7,
    mats: [
      {
        name: "Goldrune",
        qty: 86,
      },
      {
        name: "Dragon metal",
        qty: 54,
      },
    ],
    collections: ["Dragonkin IV", "Museum - Dragonkin IV"],
  },
  {
    name: "Raksha idol",
    level: 120,
    experience: 46666.7,
    mats: [
      {
        name: "Orgone",
        qty: 56,
      },
      {
        name: "Dragon metal",
        qty: 44,
      },
      {
        name: "Goldrune",
        qty: 40,
      },
    ],
    collections: ["Dragonkin IV", "Museum - Dragonkin IV"],
  },
]);

export const defaultMaterials = Object.freeze(materials);

function md5cycle(x, k) {
  let a = x[0], b = x[1], c = x[2], d = x[3];

  a = ff(a, b, c, d, k[0], 7, -680876936);
  d = ff(d, a, b, c, k[1], 12, -389564586);
  c = ff(c, d, a, b, k[2], 17, 606105819);
  b = ff(b, c, d, a, k[3], 22, -1044525330);
  a = ff(a, b, c, d, k[4], 7, -176418897);
  d = ff(d, a, b, c, k[5], 12, 1200080426);
  c = ff(c, d, a, b, k[6], 17, -1473231341);
  b = ff(b, c, d, a, k[7], 22, -45705983);
  a = ff(a, b, c, d, k[8], 7, 1770035416);
  d = ff(d, a, b, c, k[9], 12, -1958414417);
  c = ff(c, d, a, b, k[10], 17, -42063);
  b = ff(b, c, d, a, k[11], 22, -1990404162);
  a = ff(a, b, c, d, k[12], 7, 1804603682);
  d = ff(d, a, b, c, k[13], 12, -40341101);
  c = ff(c, d, a, b, k[14], 17, -1502002290);
  b = ff(b, c, d, a, k[15], 22, 1236535329);

  a = gg(a, b, c, d, k[1], 5, -165796510);
  d = gg(d, a, b, c, k[6], 9, -1069501632);
  c = gg(c, d, a, b, k[11], 14, 643717713);
  b = gg(b, c, d, a, k[0], 20, -373897302);
  a = gg(a, b, c, d, k[5], 5, -701558691);
  d = gg(d, a, b, c, k[10], 9, 38016083);
  c = gg(c, d, a, b, k[15], 14, -660478335);
  b = gg(b, c, d, a, k[4], 20, -405537848);
  a = gg(a, b, c, d, k[9], 5, 568446438);
  d = gg(d, a, b, c, k[14], 9, -1019803690);
  c = gg(c, d, a, b, k[3], 14, -187363961);
  b = gg(b, c, d, a, k[8], 20, 1163531501);
  a = gg(a, b, c, d, k[13], 5, -1444681467);
  d = gg(d, a, b, c, k[2], 9, -51403784);
  c = gg(c, d, a, b, k[7], 14, 1735328473);
  b = gg(b, c, d, a, k[12], 20, -1926607734);

  a = hh(a, b, c, d, k[5], 4, -378558);
  d = hh(d, a, b, c, k[8], 11, -2022574463);
  c = hh(c, d, a, b, k[11], 16, 1839030562);
  b = hh(b, c, d, a, k[14], 23, -35309556);
  a = hh(a, b, c, d, k[1], 4, -1530992060);
  d = hh(d, a, b, c, k[4], 11, 1272893353);
  c = hh(c, d, a, b, k[7], 16, -155497632);
  b = hh(b, c, d, a, k[10], 23, -1094730640);
  a = hh(a, b, c, d, k[13], 4, 681279174);
  d = hh(d, a, b, c, k[0], 11, -358537222);
  c = hh(c, d, a, b, k[3], 16, -722521979);
  b = hh(b, c, d, a, k[6], 23, 76029189);
  a = hh(a, b, c, d, k[9], 4, -640364487);
  d = hh(d, a, b, c, k[12], 11, -421815835);
  c = hh(c, d, a, b, k[15], 16, 530742520);
  b = hh(b, c, d, a, k[2], 23, -995338651);

  a = ii(a, b, c, d, k[0], 6, -198630844);
  d = ii(d, a, b, c, k[7], 10, 1126891415);
  c = ii(c, d, a, b, k[14], 15, -1416354905);
  b = ii(b, c, d, a, k[5], 21, -57434055);
  a = ii(a, b, c, d, k[12], 6, 1700485571);
  d = ii(d, a, b, c, k[3], 10, -1894986606);
  c = ii(c, d, a, b, k[10], 15, -1051523);
  b = ii(b, c, d, a, k[1], 21, -2054922799);
  a = ii(a, b, c, d, k[8], 6, 1873313359);
  d = ii(d, a, b, c, k[15], 10, -30611744);
  c = ii(c, d, a, b, k[6], 15, -1560198380);
  b = ii(b, c, d, a, k[13], 21, 1309151649);
  a = ii(a, b, c, d, k[4], 6, -145523070);
  d = ii(d, a, b, c, k[11], 10, -1120210379);
  c = ii(c, d, a, b, k[2], 15, 718787259);
  b = ii(b, c, d, a, k[9], 21, -343485551);

  x[0] = add32(a, x[0]);
  x[1] = add32(b, x[1]);
  x[2] = add32(c, x[2]);
  x[3] = add32(d, x[3]);

}

function cmn(q, a, b, x, s, t) {
  a = add32(add32(a, q), add32(x, t));
  return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
  return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
  return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md51(s) {
  let txt = '';
  const n = s.length,
    state = [1732584193, -271733879, -1732584194, 271733878];
  let i;
  for (i = 64; i <= s.length; i += 64) {
    md5cycle(state, md5blk(s.substring(i - 64, i)));
  }
  s = s.substring(i - 64);
  const tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (i = 0; i < s.length; i++)
    tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
  tail[i >> 2] |= 0x80 << ((i % 4) << 3);
  if (i > 55) {
    md5cycle(state, tail);
    for (i = 0; i < 16; i++) tail[i] = 0;
  }
  tail[14] = n * 8;
  md5cycle(state, tail);
  return state;
}

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
function md5blk(s) { /* I figured global was faster.   */
  const md5blks = [];
  let i; /* Andy King said do it this way. */
  for (i = 0; i < 64; i += 4) {
    md5blks[i >> 2] = s.charCodeAt(i)
      + (s.charCodeAt(i + 1) << 8)
      + (s.charCodeAt(i + 2) << 16)
      + (s.charCodeAt(i + 3) << 24);
  }
  return md5blks;
}

const hex_chr = '0123456789abcdef'.split('');

function rhex(n) {
  let s = '', j = 0;
  for (; j < 4; j++)
    s += hex_chr[(n >> (j * 8 + 4)) & 0x0F]
      + hex_chr[(n >> (j * 8)) & 0x0F];
  return s;
}

export function hex(x) {
  for (let i = 0; i < x.length; i++)
    x[i] = rhex(x[i]);
  return x.join('');
}

export function md5(s) {
  return hex(md51(s));
}

/* this function is much faster,
so if possible we use it. Some IEs
are the only ones I know of that
need the idiotic second function,
generated by an if clause.  */

function add32(a, b) {
  return (a + b) & 0xFFFFFFFF;
}

if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
  function add32(x, y) {
    const lsw = (x & 0xFFFF) + (y & 0xFFFF),
      msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }
}
