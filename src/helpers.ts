import {encodeImageString, ImgRefBind, mixColor} from "@alt1/base"
import {useState} from "react";
import * as a1lib from "../../alt1/alt1/base";
import {clearPngColorspace} from "../../alt1/alt1/base/dist/imagedetect";
import {artefactsList, imgs, Material, md5} from "./data";
import ChatBoxReader from "../../alt1/alt1/chatbox";
import {FoundType} from "./ArchHelperOptions";

export const alt1 = window.alt1

const white = mixColor(255, 255, 255);
const teal = mixColor(0, 255, 255);

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
  if (current_log_level.valueOf() > level) {
    return;
  }

}

export const setLogLevel = (level: LogLevel) => {
  current_log_level = level;
}

export const displayDetectionMessage = (message: string, duration: number, size: number = 48, color: number = white) => {
  if (duration === 0) {
    duration = 1000000;
  }
  alt1?.overLayClearGroup("1")
  alt1?.overLaySetGroup("1")
  alt1?.overLayTextEx(message, color, size, Math.round(alt1.rsWidth / 2), Math.round(alt1.rsHeight / 4), duration, "serif", true, true)
};

/*
export const displayMessage = (message: string, group: string, duration: number, size: number = 48, color: number = white, offset: number = 0) => {
  const batch = [
    ["overlay_clear_group", [group]],
    ["overlay_continue_group", [group]],
    ["overlay_set_group", [group]],
    ["overlay_text", [message, color, size, Math.round(alt1.rsWidth / 2), Math.round(alt1.rsHeight / 5) * 3 + offset, duration, "Hack Nerd Font Mono", true, true]],
  ];
  if(duration === 0) {
    batch.push(["overlay_freeze_group", [group]]);
  }
  alt1?.overLayBatch(batch);
  // alt1?.overLayClearGroup(group)
  // alt1?.overLaySetGroup(group);
  // alt1?.overLayTextEx(message, color, size, Math.round(alt1.rsWidth / 2), Math.round(alt1.rsHeight / 5) * 3, duration, "serif", true, true)
};
*/
export const displayMessage = (message: string, group: string, duration: number, size: number = 48, color: number = white, offset: number = 0) => {
  if (duration === 0) {
    duration = 1000000;
  }
  alt1.overLayClearGroup(group);
  alt1.overLaySetGroup(group);
  alt1.overLayTextEx(message, color, size, Math.round(alt1.rsWidth / 2), Math.round(alt1.rsHeight / 5) * 3 + offset, duration, "Hack Nerd Font Mono", true, true);
};

export const clearMessage = (group: string) => {
  alt1?.overLayClearGroup(group);
}

export const sortByLastSite = () => {
  return lastCommand
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
  return local.reduce((obj, item) => (obj[item.key] = {qty: item.qty, goal: item.goal}, obj), {});
}

/*
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
        ["overlay_text", [`{self.${m.key}.qty}`, mixColor(255, 255, 0), 16, x + im.width / 2, y + im.height / 2, 0, "Hack Nerd Font Mono", true, true]],
        ["overlay_rect", [-1, x - 1, y - 1, im.width + 2, im.height + 2, 0, 2]],
      )
      row_col++;
    });
    batch.push(["overlay_freeze_group", [group]])
    alt1.overLayBatch(batch);
  });
};
*/

const imageWidth = 32, imageHeight = 32, imagePadding = 4;

export const displayMaterials = (mats: Material[], group: string, cols: number) => {
  const duration = 10000000;
  const mats_model = matsToTextModel(mats);
  alt1.overLaySetGroup(group);
  alt1.overLayClearGroup(group);
  const rows = Math.max(1, Math.ceil(mats.length / cols));
  const needed_cols = Math.min(cols, Math.ceil(mats.length / rows));
  let row_col = 0;
  let _x = (width: number, col: number) => alt1.rsWidth / 2 - (5 + (mats.length > needed_cols ? cols : needed_cols) * (width + 5 + 2)) / 2 + (5 + col * (width + 5 + 2));
  let _y = (height: number, row: number) => alt1.rsHeight / 5 - (5 + rows * (height + 5 + 2)) / 2 + (5 + row * (height + 5 + 2)) + (imageHeight + imagePadding * 2) * 6;

  let _height = _y(imageWidth, rows) - _y(imageHeight, 0) + 10;
  let _width = _x(imageWidth + imagePadding, mats.length > needed_cols ? cols : needed_cols) - _x(imageWidth + imagePadding, 0) + 10;
  alt1.overLayRectFill(mixColor(0, 0, 0, 1), mixColor(0, 0, 0, 128), _x(36, 0) - 10, _y(32, 0) - 10, _width, _height, duration, 1);

  const imw = (im: any, f: number) => im.width * f
  const imh = (im: any, f: number) => im.height * f
  const scale = 1;
  mats.forEach(m => {
    const im = imgs.raw[`${m.key}_display`];
    let x = _x(imw(im, scale), row_col % cols);
    let y = _y(imh(im, scale), Math.floor(row_col / cols));
    let fontSize = 14;
    if (m.goal > 0) {
      let color = mixColor(0, 255, 0);
      let remain: number | string = mats_model[m.key].goal - mats_model[m.key].qty;
      if (remain <= 0) {
        remain = `+${mats_model[m.key].qty - mats_model[m.key].goal}`;
        color = mixColor(0, 255, 255);
      }
      alt1.overLayImage(x, y, encodeImageString(im), imw(im, scale), duration);
      alt1.overLayTextEx(`${mats_model[m.key].qty}`, mixColor(255, 255, 0), fontSize, x + (imw(im, scale) / 2), y + (imh(im, scale) / 2) - (fontSize / 4), duration, "Hack Nerd Font Mono", true, true);
      alt1.overLayTextEx(`${remain}`, color, fontSize - 2, x + imw(im, scale) / 2, y + 3 * imh(im, scale) / 4 + 2, duration, "Hack Nerd Font Mono", true, true);
    } else {
      alt1.overLayImage(x, y, encodeImageString(im), imw(im, scale), duration);
      alt1.overLayTextEx(`${mats_model[m.key].qty}`, mixColor(255, 255, 0), fontSize, x + imw(im, scale) / 2, y + imh(im, scale) / 2 - (fontSize / 4), duration, "Hack Nerd Font Mono", true, true);
    }
    alt1.overLayRect(-1, x - 2, y - 2, imw(im, scale) + 2, imh(im, scale) + 2, duration, 1);
    row_col++;
  });
};

export const toggleCrosshairs = (visible: boolean) => {
  /*
    const batch = visible ? [
      ['overlay_set_group', ['xr']],
      ['overlay_line', [white, 1, alt1.rsWidth / 2, -3 * alt1.rsWidth, alt1.rsWidth / 2, 3 * alt1.rsWidth, 0]],
      ['overlay_line', [white, 1, -3 * alt1.rsHeight, alt1.rsHeight / 2, 3 * alt1.rsHeight, alt1.rsHeight / 2, 0]],
      ['overlay_text', ['pos: {self.mouse_x}, {self.mouse_y}', teal, 20, alt1.rsWidth / 2 + 15, alt1.rsHeight / 2 - 30, 0, 'Hack Nerd Font Mono', false, true]],
      ['overlay_freeze_group', ['xr']],
      ['overlay_move_group', ['xr', true]]
    ] : [
      ['overlay_move_group', ['xr', false]],
      ["overlay_clear_group", ["xr"]]
    ];
    alt1.overLayBatch(batch);
  */
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
  alt1.overLayClearGroup(group);
};

export const screenshot = (): void => {
  const img: ImgRefBind = a1lib.captureHoldFullRs();
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
      // const item = store.get(key);
      console.log("<ULS>: Fetched from local storage", item);
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

      console.log("<ULS>: Saving to local storage", valueToStore);
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
      // Allow value to be a function, so we have same API as useState
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
const timeMatch = RegExp(/\[(\d+):(\d+):(\d+)\]/);
export const oldMessage = (time, threshold = 3000): boolean => {
  if (!timeMatch.test(time)) {
    console.log(`No leading time found, ignoring line: ${time}`)
    return true;
  }
  if (timeMatch.test(time)) {
    let result = timeMatch.exec(time);
    if (result !== null) {
      let now = new Date();
      let then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +result[1], +result[2], +result[3], 0);
      console.log(`${now.getTime() - then.getTime() > threshold ? "+" : "-"}Diff (${now.getTime() - then.getTime()}) Now: ${now} vs ${then}`);
      return now.getTime() - then.getTime() > threshold;
    }
  }
  return false;
}
const aliases = {
  "is": "ignore survey"
};
const [clru, setClru] = abuseLocalStorage<string[]>('chat_clru', []);
const ppmatch = RegExp(/([\d,]+) coins have been added to your money pouch\./);
const cmdmatch = RegExp(/\[\d+:\d+:\d+\] \[FC\] (.\w+): !(.*)/);

let runningTotal = 0;
let lastcmd = '';
let ignoreSurvey = false;
export const detectChatCommand = (line: string, mats: Material[]) => {
  let today = todayFormatted();
  let found: FoundType = {
    type: '',
    trigger: false,
    rawcommand: '',
    command: {
      type: null,
      args: {
        sort: null,
        filter: null,
        filterArgs: null,
      },
    },
    player: '',
    color: white,
    mats: mats,
    hash: md5(today + ' ' + line),
  };
  if (clru.indexOf(found.hash) > -1) {
    // console.log(`Duplicate found: ${line} -> ${found.hash}`);
    return found;
  }
  if (oldMessage(line)) {
    // console.log(`Old message found: ${line} -> ${found.hash}`);
    return found;
  }
  if (line.toLowerCase().endsWith('where does it point to?')) {
    line = "[00:00:00] [FC] player: !collection tetracompass";
  }
  if (ppmatch.test(line)) {
    let result = ppmatch.exec(line);
    if (result !== null) {
      let amount = result[1];
      if (amount.indexOf(',') > -1) {
        amount = amount.replace(/,/, '');
        console.log(`Found ${amount}`);
      }
      runningTotal += +amount;
      displayMessage(`$${runningTotal}`, "pickpocket", 5000, 48, teal, -48);
      found.trigger = false;
    }
  } else if (cmdmatch.test(line)) {
    let result = cmdmatch.exec(line);
    if (result !== null) {
      console.log(`Player: ${result[1].toLowerCase()} Command: ${result[2].toLowerCase()}`);
      found.trigger = true;
      found.player = result[1];
      found.rawcommand = aliasFor(result[2].toLowerCase()) || result[2].toLowerCase();
      if (found.rawcommand.startsWith('last')) {
        line = lastcmd;
        console.log(`last = [${lastcmd}]`)
        result = cmdmatch.exec(line);
        found.trigger = true;
        found.player = result[1];
        found.rawcommand = result[2].toLowerCase();
      }

      if (found.rawcommand.startsWith('update')) {
        console.log("found update rawcommand");
        let key = found.rawcommand.substring('update'.length).trim();
        let keys = [];
        if (key.indexOf(',') > -1) {
          key.split(',').forEach(k => {
            let amount = 1;
            if (k.indexOf(":") > -1) {
              amount = +k.substring(k.indexOf(":") + 1);
              k = k.substring(0, k.indexOf(":"));
            }
            keys.push({name: k, amount});
          })

        } else {
          let amount = 1;
          if (key.indexOf(":") > -1) {
            amount = +key.substring(key.indexOf(":") + 1);
            key = key.substring(0, key.indexOf(":"));
          }
          keys.push({name: key, amount});
        }
      } else if (found.rawcommand.startsWith('restore')) {
        console.log("found restore rawcommand");
        let key = found.rawcommand.substring('restore'.length).trim();
        let keys = [];
        if (key.indexOf(',') > -1) {
          key.split(',').forEach(k => {
            let amount = 1;
            if (k.indexOf(":") > -1) {
              amount = +k.substring(k.indexOf(":") + 1);
              k = k.substring(0, k.indexOf(":"));
            }
            keys.push({name: k, amount});
          })
        } else {
          let amount = 1;
          if (key.indexOf(":") > -1) {
            amount = +key.substring(key.indexOf(":") + 1);
            key = key.substring(0, key.indexOf(":"));
          }
          keys.push({name: key, amount});
        }
        console.log("filtered keys:", keys);
        const arts = keys.map(k => artefactsList.find(al => al.name.toLowerCase() === k.name));
        console.log("filtered artifacts:", arts);
        const names = namesZeroMats(arts, mats);
        for (let iart in arts) {
          for (let imat in arts[iart].mats) {
            let cmat = arts[iart].mats[imat];
            let artname = arts[iart].name.toLowerCase();
            mats.filter(m => m.key === cmat.key).forEach(m => {
              keys.filter(k => k.name === artname).forEach(k => {
                let qty = cmat.qty * k.amount;
                console.log(`for ${cmat.name} => ${cmat.qty} * ${k.name}(${k.amount})`);
                m.goal += qty;
              });
            });
          }
        }
        found.command = {
          type: 'Sort',
          args: {
            filter: "ARG_FILTER",
            filterArgs: {
              key: names
            },
            sort: {
              keys: ['faction', 'level'],
              desc: false
            }
          }
        }
        found.mats = [...mats];
        lastcmd = line;
      } else if (found.rawcommand.startsWith('collection')) {
        console.log("found collections rawcommand");
        let key = found.rawcommand.substring('collection'.length).trim();
        let amount = 1;
        if (key.indexOf(":") > -1) {
          amount = +key.substring(key.indexOf(":") + 1);
          key = key.substring(0, key.indexOf(":"));
        }
        const arts = artefactsList.filter(al => al.collections.map(c => c.toLowerCase()).indexOf(key) > -1);
        const names = namesZeroMats(arts, mats);
        for (let iart in arts) {
          for (let imat in arts[iart].mats) {
            let cmat = arts[iart].mats[imat];
            mats.filter(m => m.key === cmat.key).forEach(m => {
              let qty = cmat.qty * amount;
              m.goal += qty;
            });
          }
        }
        console.log(`${amount}xPotential List:`, arts, names);
        found.command = {
          type: 'Sort',
          args: {
            filter: "ARG_FILTER",
            filterArgs: {
              key: names
            },
            sort: {
              keys: ['faction', 'level'],
              desc: false
            }
          }
        }
        found.mats = [...mats];
        lastcmd = line;
      } else if (found.rawcommand.startsWith('track')) {
        found.trigger = true;
        const keys = found.rawcommand.substring('track'.length).trim().replace(/\s/g, '_').split(',');
        console.log("found track keys:", keys);
        for (let ikey in keys) {
          console.log("checking key: " + keys[ikey]);
          if (keys[ikey].indexOf(":") > -1) {
            let goal = keys[ikey].substring(keys[ikey].indexOf(":") + 1);
            keys[ikey] = keys[ikey].substring(0, keys[ikey].indexOf(":"));
            console.log("key/goal:", keys[ikey], goal);
            mats.filter(m => m.key === keys[ikey]).forEach(m => {
              m.goal = +goal;
              console.log(`Updated goal for ${m.name} to ${m.goal} (${m.qty})`);
            })
          }
        }
        found.command = {
          type: 'Sort',
          args: {
            filter: "ARG_FILTER",
            filterArgs: {
              key: keys
            },
            sort: {
              keys: ['faction', 'level'],
              desc: false
            }
          }
        };
        found.mats = [...mats];
        lastcmd = line;
      } else if (found.rawcommand.startsWith('ignore')) {
        if(found.rawcommand.startsWith('ignore survey')) {
          ignoreSurvey = !ignoreSurvey;
          displayMessage(`Toggled "ignoring surveys": ${ignoreSurvey ? "on" : "off"}`, "arch_message", 3000, 20, teal);
        }
        found.trigger = false;
      }
      return found;
    }
  }
  clru.splice(0, 0, found.hash);
  if (clru.length > 200) {
    setClru([...clru.slice(0, 200)])
  } else {
    setClru([...clru]);
  }
  return found;
};

function aliasFor(cmd) {
  return aliases[cmd];
}

function namesZeroMats(arts, mats) {
  const names = [];
  for (let iart in arts) {
    for (let imat in arts[iart].mats) {
      let cmat = arts[iart].mats[imat];
      mats.filter(m => m.key === cmat.key).forEach(m => {
        let mkey = m.key;
        if (names.indexOf(mkey) === -1) {
          names.push(mkey);
        }
        m.goal = 0;
      });
    }
  }
  return names;
}

ignoreSurvey = false;
const [lru, setLru] = abuseLocalStorage<string[]>('chat_lru', []);
let lastCommand = {
  type: '',
  args: null
};

export const detectChatArch = (readerRef: ChatBoxReader, line: string, mats: Material[], playSound) => {
  let today = todayFormatted();
  let found = {
    type: "Unknown",
    command: {
      type: null,
      args: {
        sort: null,
        filter: null,
        filterArgs: null,
      }
    },
    mat: null,
    skip: false,
    color: white,
    hash: md5(today + ' ' + line),
    changes: false
  };
  let normalized = readerRef.simplifyLine(line);
  console.log(`N: ${normalized}`);
  if (lru.indexOf(found.hash) > -1) {
    // console.debug(`Ignored message found: ${line} -> ${found.hash}`);
    return found;
  }
  if (oldMessage(line)) {
    // console.debug(`Old message found: ${line} -> ${found.hash}`);
    return found;
  }
  if (line.indexOf('The time sprite has moved to another') > -1) {
    console.log('TIME SPRITE MOVED!');
    displayMessage(`TIME SPRITE MOVED!!!`, "time_sprite", 5000, 48, teal, -48);
    // playSound();
    lru.splice(0, 0, found.hash);
  }
  if (normalized.indexOf(readerRef.simplifyLine('You find some')) > -1) {
    found.type = 'Normal';
    found.color = white;
  } else if (normalized.indexOf(readerRef.simplifyLine('Your auto-screener')) > -1) {
    found.type = 'Auto-screener';
    found.color = white;
    found.skip = true;
  } else if (normalized.indexOf(readerRef.simplifyLine('Your incense burner')) > -1) {
    found.type = 'Incense';
    found.color = white;
  } else if (normalized.indexOf(readerRef.simplifyLine('Your familiar has produced an item')) > -1) {
    found.type = 'Familiar';
    found.color = mixColor(0, 255, 255);
  } else if (normalized.indexOf(readerRef.simplifyLine("storage")) > -1) {
    if (normalized.indexOf(readerRef.simplifyLine('Fortune perk')) > -1) {
      found.type = 'Fortune';
      found.color = mixColor(45, 186, 21);
    } else if (normalized.indexOf(readerRef.simplifyLine('Your imp-souled perk')) > -1) {
      found.type = 'Imp-souled';
      found.color = mixColor(0, 255, 0);
    } else {
      found.type = 'Porter';
      found.color = mixColor(255, 255, 0);
    }
  } else if ((normalized.indexOf(readerRef.simplifyLine("Fortune perk")) > -1 || normalized.indexOf(readerRef.simplifyLine("Your imp-souled perk")) > -1) && normalized.indexOf(readerRef.simplifyLine("your bank")) > -1) {
    if (normalized.indexOf('Fortune perk') > -1) {
      found.type = 'Fortune';
    } else if (normalized.indexOf(readerRef.simplifyLine('Your imp-souled perk')) > -1) {
      found.type = 'Imp-souled';
    }
  } else {
    if (!ignoreSurvey && normalized.indexOf(readerRef.simplifyLine("Materials gained:")) == -1 && normalized.indexOf(readerRef.simplifyLine("Materials: ")) > -1) {
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
            keys: ['faction', 'level'],
            desc: false
          }
        }
      };
      lastCommand = found.command;
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
      console.log(`Detected: ${c.name} from ${found.type} (${c.qty} => ${c.qty + 1})`);
      if (!found.skip) {
        c.qty++;
      }
      // if(c.qty >= c.goal) {
      //   c.goal = 0;
      // }
      c.last = Date.now();
      found.changes = true;
      found.mat = c;
      if (c.goal > 0) {
        displayMessage(`${c.name} from ${found.type}: ${c.qty} (${c.goal})`, "arch_message", 3000, 20, found.color);
      } else {
        displayMessage(`${c.name} from ${found.type}: ${c.qty}`, "arch_message", 3000, 20, found.color);
      }
    }
  });
  return found;
};
