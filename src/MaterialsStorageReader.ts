import * as OCR from "@alt1/ocr";
import {ColortTriplet} from "@alt1/ocr";
import * as a1lib from "@alt1/base";
import {ImageData, ImgRef} from "@alt1/base";
import font from "@alt1/ocr/fonts/pixel_digits_8px_shadow";
import {sortMats} from "./helpers";
import {Material, materials} from "./data";
import {ModalUIReader} from "./detect/modaluireader";

const defaultcolors: ColortTriplet[] = [
  [80, 90, 16], // 0
  [80, 88, 15], // 0
  [77, 77, 1], // 0
  [80, 80, 0], // 0
  [61, 73, 0], // 0
  [176, 176, 0], // yellow?
  [255, 255, 0], // yellow
  [0, 255, 0] // green
];

/*
const matNames = [
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
  // material_storage: require("./detect/material_storage.data.png"),
  third_age_iron: require("./detect/third_age_iron.data.png"),
  third_age_iron_disabled: require("./detect/third_age_iron_disabled.data.png"),
  // stormguard_steel: require("./images/stormguard_steel.data.png"),
  // stormguard_steel_disabled: require("./images/stormguard_steel_disabled.data.png"),
  // malachite_green: require("./images/malachite_green.data.png"),
  // malachite_green_disabled: require("./images/malachite_green_disabled.data.png"),
  // compass_rose: require("./images/compass_rose.data.png"),
  // compass_rose_disabled: require("./images/compass_rose_disabled.data.png"),
  // keramos: require("./images/keramos.data.png"),
  // keramos_disabled: require("./images/keramos_disabled.data.png"),
  // cadmium_red: require("./images/cadmium_red.data.png"),
  // cadmium_red_disabled: require("./images/cadmium_red_disabled.data.png"),
  zarosian_insignia: require("./detect/zarosian_insignia.data.png"),
  zarosian_insignia_disabled: require("./detect/zarosian_insignia_disabled.data.png"),
  // aetherium_alloy_display: require("../public/images/aetherium_alloy.data.png"),
  // ancient_vis_display: require("../public/images/ancient_vis.data.png"),
  // animal_furs_display: require("../public/images/animal_furs.data.png"),
  // armadylean_yellow_display: require("../public/images/armadylean_yellow.data.png"),
  // blood_of_orcus_display: require("../public/images/blood_of_orcus.data.png"),
  // cadmium_red_display: require("../public/images/cadmium_red.data.png"),
  // carbon_black_display: require("../public/images/carbon_black.data.png"),
  // chaotic_brimstone_display: require("../public/images/chaotic_brimstone.data.png"),
  // cobalt_blue_display: require("../public/images/cobalt_blue.data.png"),
  // compass_rose_display: require("../public/images/compass_rose.data.png"),
  // demonhide_display: require("../public/images/demonhide.data.png"),
  // dragon_metal_display: require("../public/images/dragon_metal.data.png"),
  // everlight_silvthril_display: require("../public/images/everlight_silvthril.data.png"),
  // eye_of_dagon_display: require("../public/images/eye_of_dagon.data.png"),
  // felt_display: require("../public/images/felt.data.png"),
  // fossilised_bone_display: require("../public/images/fossilised_bone.data.png"),
  // goldrune_display: require("../public/images/goldrune.data.png"),
  // hellfire_metal_display: require("../public/images/hellfire_metal.data.png"),
  // imperial_steel_display: require("../public/images/imperial_steel.data.png"),
  // keramos_display: require("../public/images/keramos.data.png"),
  // leather_scraps_display: require("../public/images/leather_scraps.data.png"),
  // malachite_green_display: require("../public/images/malachite_green.data.png"),
  // mark_of_the_kyzaj_display: require("../public/images/mark_of_the_kyzaj.data.png"),
  // orgone_display: require("../public/images/orgone.data.png"),
  // othenglass_display: require("../public/images/othenglass.data.png"),
  // quintessence_display: require("../public/images/quintessence.data.png"),
  // samite_silk_display: require("../public/images/samite_silk.data.png"),
  // soapstone_display: require("../public/images/soapstone.data.png"),
  // star_of_saradomin_display: require("../public/images/star_of_saradomin.data.png"),
  // stormguard_steel_display: require("../public/images/stormguard_steel.data.png"),
  // third_age_iron_display: require("../public/images/third_age_iron.data.png"),
  // tyrian_purple_display: require("../public/images/tyrian_purple.data.png"),
  // vellum_display: require("../public/images/vellum.data.png"),
  // vulcanised_rubber_display: require("../public/images/vulcanised_rubber.data.png"),
  // warforged_bronze_display: require("../public/images/warforged_bronze.data.png"),
  // white_marble_display: require("../public/images/white_marble.data.png"),
  // white_oak_display: require("../public/images/white_oak.data.png"),
  // wings_of_war_display: require("../public/images/wings_of_war.data.png"),
  // yubiusk_clay_display: require("../public/images/yubiusk_clay.data.png"),
  // zarosian_insignia_display: require("../public/images/zarosian_insignia.data.png")
});

const cleanName = (name) => {
  return name?.replace("'", "")?.replace(/\s+/g, "_")?.toLowerCase();
}

const [backup, setBackup] = abuseLocalStorage('arch_helper_options_backup', defaultMaterials)
*/

export enum MaterialStorageReadState {
  STARTED,
  READ_STAGE_ONE,
  READ_STAGE_TWO,
  FINISHED,
  IDLE,
}

/*
export const nextMaterialStorageReadState = (currentState: MaterialStorageReadState): MaterialStorageReadState => {
  if (currentState.valueOf() === MaterialStorageReadState.IDLE.valueOf()) {
    return MaterialStorageReadState.IDLE;
  }
  let next: string = enumKeys(MaterialStorageReadState).find((k, v) => +v === currentState.valueOf() + 1);
  return MaterialStorageReadState[next];
}
*/

export type ReadState = {
  state: MaterialStorageReadState,
  status: boolean,
  detail: string,
  materials: Material[],
}

export default class MaterialsStorageReader {
  private _materialsData: Material[];
  private _currentReadState: MaterialStorageReadState = MaterialStorageReadState.IDLE;
  private stageOneComplete: boolean = false;
  private stageTwoComplete: boolean = false;

  constructor(mats: Material[] = null,
  ) {
    mats = mats === null ? JSON.parse(JSON.stringify(materials)) : mats;
    this._materialsData = sortMats(mats, ['faction', 'level']);

  }

  start() {
    this._currentReadState = MaterialStorageReadState.STARTED;
    this.stageOneComplete = false;
    this.stageTwoComplete = false;
  }

  set materialsData(value: Material[]) {
    this._materialsData = value;
  }

  get materialsData(): Material[] {
    return this._materialsData;
  }

  get currentReadState(): MaterialStorageReadState {
    return this._currentReadState;
  }

  set currentReadState(value: MaterialStorageReadState) {
    this._currentReadState = value;
  }

  reset(): void {
    this._currentReadState = MaterialStorageReadState.IDLE;
  }

  running(): boolean {
    return this.currentReadState.valueOf() < MaterialStorageReadState.IDLE.valueOf()
  }

  public read(): ReadState {
    if (!window.alt1) {
      console.log('You need to run this page in alt1 to capture the screen');
      return {
        state: MaterialStorageReadState.IDLE,
        status: false,
        detail: "You need to run this page in alt1 to capture the screen",
        materials: this._materialsData,
      };
    }
    if (!alt1.permissionPixel) {
      console.log('Page is not installed as app or capture permission is not enabled');
      return {
        state: MaterialStorageReadState.IDLE,
        status: false,
        detail: "Page is not installed as app or capture permission is not enabled",
        materials: this._materialsData
      };
    }
    let detail: string, status = true;
    if (this.stageOneComplete && this.stageTwoComplete) {
      this._currentReadState = MaterialStorageReadState.FINISHED;
    } else {
      const img = a1lib.captureHoldFullRs();

      this.findMaterialsQuantities(img);
    }
    // noinspection FallThroughInSwitchStatementJS
    switch (this._currentReadState) {
      case MaterialStorageReadState.FINISHED:
      case MaterialStorageReadState.IDLE:
        this._currentReadState = MaterialStorageReadState.IDLE;
        detail = "Material Storage quantities captured.";
        break;
      case MaterialStorageReadState.STARTED:
        detail = "Open 'Material Storage' from Archaeology Journal.";
        break
      case MaterialStorageReadState.READ_STAGE_ONE:
        detail = this.stageOneComplete ? "Scroll down so 'Zarosian insignia' is visible." : "Scroll up so 'Third age iron' is visible.";
        break
      case MaterialStorageReadState.READ_STAGE_TWO:
        detail = this.stageTwoComplete ? "Scroll up so 'Third age iron' is visible." : "Scroll down so 'Zarosian insignia' is visible.";
        break
      default:
        this.reset();
        detail = "uh. wtf?"
        status = false;
        break;
    }
    return {
      state: this._currentReadState,
      status: status,
      detail: detail,
      materials: this._materialsData
    };
  }

  private findMaterialsQuantities(img: ImgRef) {
    const modals = ModalUIReader.find(img);
    if(modals.length === 0) {
      return;
    }
    let pos = modals[0];

    let buf:ImageData = pos.img.toData(pos.rect.x, pos.rect.y, pos.rect.width, pos.rect.height);
    switch(pos.scrollPosition) {
      case "top":
        return this.readTop(buf, this._materialsData);
      case "bot":
        return this.readBot(buf, this._materialsData);
    }
  }

  private readTop(buf:ImageData, mats) {
    const rowLen = (r) => (r === 0 ? 10 : 5);
    const dx = (i) => 22 + (i * 45);
    const dy = (r) => 50 + (r * 70);
    let read_any: boolean = false;
    let index = 0;
    for (let r = 0; r < 4; r++) {
      for (let i = 0; i < rowLen(r); i++) {
        const line = OCR.readLine(buf, font, defaultcolors, dx(i), dy(r), true, true);
        if (line.text !== '') {
          read_any = true;
        }
        mats[index].last = Date.now();
        mats[index++].qty = +line.text;      }
    }
    if(read_any && !this.stageOneComplete) {
      this.stageOneComplete = true;
      this._currentReadState = this.stageTwoComplete ? MaterialStorageReadState.FINISHED : MaterialStorageReadState.READ_STAGE_TWO;
    }
    console.log("MATS:", this._materialsData);
  }

  private readBot(buf:ImageData, mats) {
    const dx = (i) => 22 + (i * 45);
    const dy = (r) => 134 + (r * 70);
    let read_any: boolean = false;
    let index = 25;
    for (let r = 0; r < 3; r++) {
      for (let i = 0; i < 5; i++) {
        const line = OCR.readLine(buf, font, defaultcolors, dx(i), dy(r), true, true);
        if (line.text !== '') {
          read_any = true;
        }
        mats[index].last = Date.now();
        mats[index++].qty = +line.text;
      }
    }
    if(read_any && !this.stageTwoComplete) {
      this.stageTwoComplete = true;
      this._currentReadState = this.stageOneComplete ? MaterialStorageReadState.FINISHED : MaterialStorageReadState.READ_STAGE_ONE;
    }
    console.log("MATS:", this._materialsData);
  }

/*
  private findMaterialsQuantitiesRows(img: ImgRef, mats, forward: boolean) {
    const from = forward ? 'third_age_iron' : 'zarosian_insignia';
    const fromImg = imgs[from];
    const fromImgDisabled = imgs[`${from}_disabled`];
    const found = this.findActiveOrInactiveMaterial(img, fromImg, fromImgDisabled);
    const loc = found.loc;
    if (loc.length == 0) {
      console.info(`Cannot find ${from}. Is materials storage open?`);
      return;
    }
    const reimg = a1lib.capture(loc[0].x, loc[0].y - (32 - fromImg.height) - (forward ? 0 : 210), 441, 242);
    const rowLen = (r) => (forward && r === 0 ? 10 : 5);
    const dx = (i) => 3 + (i * 45);
    const dy = (r) => 9 + (r * 70);
    const matFor = (r, i) => {
      let index = (forward ? 0 : 20) + (r > 0 ? (r - 1) * 5 + (forward ? 10 : 5) : 0) + i;
      return matNames[index];
    }
    let read_any: boolean = false;
    for (let r = 0; r < 4; r++) {
      for (let i = 0; i < rowLen(r); i++) {
        const result = ocr.readLine(reimg, font, defaultcolors, dx(i), dy(r), true, true);
        const cmat = matFor(r, i);
        const mat = mats.find(m => cleanName(m.name) === cmat);
        console.debug(`r:${r},${i} => ${cmat} #${result.text}`);
        if (result.text === '') { //0 kinda
          if (mat.qty != 0) {
            console.debug(`Updating ${mat.name}: ${mat.qty} => 0`);
            mat.last = Date.now();
          }
          read_any = true;
          mat.qty = 0;
        } else {
          const nqty = +result.text;
          if (mat.qty !== nqty) {
            console.debug(`Updating ${mat.name}: ${mat.qty} => ${nqty}`);
            mat.last = Date.now();
          }
          read_any = true;
          mat.qty = nqty;
        }
      }
    }
    if (forward && read_any && !this.stageOneComplete) {
      this.stageOneComplete = true;
      this._currentReadState = this.stageTwoComplete ? MaterialStorageReadState.FINISHED : MaterialStorageReadState.READ_STAGE_TWO;
    } else if(!forward && read_any && !this.stageTwoComplete) {
      this.stageTwoComplete = true;
      this._currentReadState = this.stageOneComplete ? MaterialStorageReadState.FINISHED : MaterialStorageReadState.READ_STAGE_ONE;
    }
  }

  private findActiveOrInactiveMaterial(img: ImgRef, from: ImageData, from_disabled: ImageData) {
    let needle = img.findSubimage(imgs.material_storage);
    if (needle.length === 0) {
      this._currentReadState = MaterialStorageReadState.STARTED;
      return {loc: [], empty: true};
    }
    needle = img.findSubimage(from);
    let empty = false;
    if (needle.length === 0) {
      needle = img.findSubimage(from_disabled);
      empty = true;
    }
    return {loc: needle, empty};
  };
  */
}
