import {Material, materials} from "./data";

export type SortOptions = {
  keys: string[],
  desc: boolean;
};

export type FilterOptions = "NONE"|"RECENT_10_MIN"|"RECENT_3"|"ARG_FILTER";

type Filterer = ((arg0?) => {filter: (arg1: Material[]) => Material[]});

const noFilterOption = (_?) => {
  return {
    filter: (arg0: Material[]): Material[] => arg0
  }
};

const recentTimeFilterOption = (_?) => (time) => {
  return {
    filter: (arg1: Material[]): Material[] => arg1.filter(m => +new Date() - time < m.last)
  }
};

const countFilterOption = (_?) => (count) => {
  return {
    filter: (arg0: Material[]): Material[] => arg0.slice(0, count)
  }
};

export const namesFilterOption = (names) => {
  return {
    filter: (arg0: Material[]): Material[] => arg0.filter(m => names.indexOf(m.name) > -1)
  }
};

export const argsFilterOption = (keyValues: {[k: string]: any[]}) => {
  return {
    filter: (arg0: Material[]): Material[] => arg0.filter(m => {
      return Object.entries(keyValues).map(k => k[1].indexOf(m[k[0]]) > -1).every(v => v === true)
    })
  }
};

export const MaterialFilterOptionsMap: {[k:string]: Filterer} = {
  NONE: noFilterOption,
  RECENT_10_MIN: recentTimeFilterOption(600_000),
  ARG_FILTER: (arg0) => argsFilterOption(arg0),
  RECENT_3: countFilterOption(3)
};

export const materialStorageSort: SortOptions = {
  keys: ['faction', 'level'],
  desc: false
}

export default class ArchHelperOptions {
  private readonly _materialsData: Material[];
  private readonly _sortOptions: SortOptions;
  private readonly _filterOptions: FilterOptions;
  private readonly _filterOptionsArgs: any[];

  constructor(
    materialsData: Material[] = materials,
    sortOptions: SortOptions = materialStorageSort,
    filterOptions: FilterOptions = "NONE",
    filterOptionsArgs?: any[],
  ) {
    this._materialsData = [...materialsData];
    this._sortOptions = sortOptions;
    this._filterOptions = filterOptions;
    this._filterOptionsArgs = filterOptionsArgs;
  }

  get materialsData(): Material[] {
    return this._materialsData;
  }

  get sortOptions(): SortOptions {
    return this._sortOptions;
  }

  get filterOptions(): FilterOptions {
    return this._filterOptions;
  }

  get filterOptionsArgs(): any[] {
    return this._filterOptionsArgs;
  }

  public shapedData(): Material[] {
    return this.filterSort()
  }

  public filterMaterials(options: FilterOptions): Material[] {
    if(this._filterOptionsArgs) {
      return MaterialFilterOptionsMap[options](this._filterOptionsArgs).filter(this._materialsData)
    }
    return MaterialFilterOptionsMap[options]().filter(this._materialsData)
  }

  public sortMaterials(options: SortOptions): Material[] {
    return this._materialsData.sort((a, b) => {
      const s = (y, z) => {
        if (typeof y === 'string' && typeof z === 'string') {
          let comp = options.desc ? z.localeCompare(y) : y.localeCompare(z);
          return comp === 0 ? 0 : comp < 0 ? -1 : 1;
        } else if (typeof y === 'number' && typeof z === 'number') {
          let comp = options.desc ? z - y : y - z;
          return comp === 0 ? 0 : comp < 0 ? -1 : 1;
        }
      };
      return options.keys.map(k => s(a[k], b[k])).reduce((p, c, i, a) => {
        return p === undefined ? c : p === 0 ? c : p;
      }, undefined);
    });
  }

  public filterSort(): Material[] {
    let local = this.filterOptions === "RECENT_3" ? this.sortMaterials({keys:["last", "faction", "id"], desc: true}) : this.sortMaterials(this._sortOptions);
    local = MaterialFilterOptionsMap[this._filterOptions](this._filterOptionsArgs).filter(local)
    return local;
  }
}

const emptyArchHelperOptions = new ArchHelperOptions();
