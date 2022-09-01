import {ImgRefBind, mixColor} from "@alt1/base"
import {useState} from "react";
import * as a1lib from "../../alt1/alt1/base";
import {clearPngColorspace} from "../../alt1/alt1/base/dist/imagedetect";
import {imgs, Material, md5} from "./data";

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
    ["overlay_text", [message, color, size, Math.round(alt1.rsWidth / 2), Math.round(alt1.rsHeight / 5) * 3 + offset, duration, "Menlo", true, true]],
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
  alt1.overLayTextEx(message, color, size, Math.round(alt1.rsWidth / 2), Math.round(alt1.rsHeight / 5) * 3 + offset, duration, "Menlo", true, true);
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
  return local.reduce((obj, item) => (obj[item.key] = {qty: item.qty}, obj), {});
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
        ["overlay_text", [`{self.${m.key}.qty}`, mixColor(255, 255, 0), 16, x + im.width / 2, y + im.height / 2, 0, "Menlo", true, true]],
        ["overlay_rect", [-1, x - 1, y - 1, im.width + 2, im.height + 2, 0, 2]],
      )
      row_col++;
    });
    batch.push(["overlay_freeze_group", [group]])
    alt1.overLayBatch(batch);
  });
};
*/

export const displayMaterials = (mats: Material[], group: string, cols: number) => {
  const duration = 1000000;
  const mats_model = matsToTextModel(mats);
  alt1.overLaySetGroup(group);
  alt1.overLayClearGroup(group);
  const rows = Math.max(1, Math.ceil(mats.length / cols));
  const needed_cols = Math.min(cols, Math.ceil(mats.length / rows));
  let row_col = 0;
  let _x = (im, col) => alt1.rsWidth / 2 - (5 + needed_cols * (im.width + 5 + 2)) / 2 + (5 + col * (im.width + 5 + 2));
  let _y = (im, row) => alt1.rsHeight / 5 - (5 + rows * (im.height + 5 + 2)) / 2 + (5 + row * (im.height + 5 + 2)) + 30;
  mats.forEach(m => {
    const im = imgs.raw[`${m.key}_display`];
    let x = _x(im, row_col % cols);
    let y = _y(im, Math.floor(row_col / cols));
    alt1.overLayRect(-1, x - 2, y - 2, im.width + 3, im.height + 3, duration, 2);
    alt1.overLayTextImage(x, y, im.toPngBase64(), im.width, duration, `${mats_model[m.key].qty}`, mixColor(255, 255, 0), 12, "Menlo", true, true);
    // alt1.overLayImage(x, y, im.toPngBase64(), im.width, duration);
    // alt1.overLayTextEx(`${mats_model[m.key].qty}`, mixColor(255, 255, 0), 12, x + im.width / 2, y + im.height / 2, duration, "Menlo", true, true);
    row_col++;
  });
};

/*
export const _updateMaterials = (group, mats: Material[]) => {
  const message_model = {
    ...matsToTextModel(mats),
    __animate: true
  };
  alt1.overLaySetGroup(group, message_model);
};
*/

/*
export const __updateMaterials = (mats: Material[], group: string, cols: number = 5) => {
  const duration = 1000000;
  alt1.overLayClearGroup(group);
  alt1.overLaySetGroup(group);
  console.log("cleared text");
  const mats_model = matsToTextModel(mats);
  imgs.promise.then(p => {
    const rows = Math.max(1, Math.ceil(mats.length / cols));
    const needed_cols = Math.min(cols, Math.ceil(mats.length / rows));
    let row_col = 0;
    let _x = (im, col) => alt1.rsWidth / 2 - (5 + needed_cols * (im.width + 5 + 2)) / 2 + (5 + col * (im.width + 5 + 2));
    let _y = (im, row) => alt1.rsHeight / 5 - (5 + rows * (im.height + 5 + 2)) / 2 + (5 + row * (im.height + 5 + 2)) + 30;
    alt1.overLayClearGroup(`${group}_text`);
    mats.forEach(m => {
      const im = p[`${m.key}_display`];
      let x = _x(im, row_col % cols);
      let y = _y(im, Math.floor(row_col / cols));

      alt1.overLayTextEx(`${mats_model[m.key]}`, mixColor(255, 255, 0), 16, x + im.width / 2, y + im.height / 2, duration, "Menlo", true, true);
      alt1.overLaySetGroupZIndex(`${group}_text`, 10000);
      row_col++;
    });
  });
};
*/

export const toggleCrosshairs = (visible: boolean) => {
  /*
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

let lastCommand = {
  type: '',
  args: null
};
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
    displayMessage(`TIME SPRITE MOVED!!!`, "time_sprite", 5000, 48, teal, -48);
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
    if (line.indexOf("Materials: ") > -1) {
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
      console.log(`Detected: ${c.name} from ${found.type}`);
      c.qty++;
      c.last = Date.now();
      found.changes = true;
      found.mat = c;
      displayMessage(`${c.name} from ${found.type}: ${c.qty}`, "arch_message", 3000, 20, found.color);
    }
  });
  return found;
};
