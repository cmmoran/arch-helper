//alt1 base libs, provides all the commonly used methods for image matching and capture
//also gives your editor info about the window.alt1 api
import {mixColor} from "@alt1/base";

import React, {useEffect, useRef, useState} from "react"
import ReactDOM from "react-dom"
import ChatBoxReader from "@alt1/chatbox"
import {
  clearMessage,
  detectChatArch,
  displayDetectionMessage,
  displayMaterials,
  displayMessage,
  hide,
  screenshot,
  sortByLastSite,
  toggleCrosshairs,
  useLocalStorage
} from "./helpers"
import ArchHelperOptions, {materialStorageSort} from "./ArchHelperOptions";
import MaterialsStorageReader, {MaterialStorageReadState, ReadState} from "./MaterialsStorageReader";

const SCAN_MATERIAL_STORAGE: string = 'Scan';
const STOP_SCANNING: string = 'Stop';

const createMaterialsReader = () => {
  return new MaterialsStorageReader();
};

const createChatReader = () => {
  const reader = new ChatBoxReader()

  const additionalColors = [
    mixColor(255, 255, 255), //White text
    mixColor(0, 255, 0), //Green Imp-souled Text
    mixColor(45, 186, 21),
    mixColor(67, 188, 188), //survey text color
    mixColor(60, 183, 30), //Dark Green Fortune Text
    mixColor(58, 176, 30), //Dark Green Fortune Text
    mixColor(163, 53, 238), //rex_fragments
    mixColor(238, 118, 0), //Familiarization/Daily Challenge Orange
    mixColor(174, 0, 0), //As you're an ironman.... red
    mixColor(159, 255, 155), //clan chat?
  ];
  reader.readargs.colors.push(...additionalColors);
  return reader
}

// function ensureMats(mats) {
//   return [...(mats !== null && mats.length > 0 ? mats : [])];
// }

const createArchHelperOptions = () => {
  return new ArchHelperOptions();
}

function App() {
  const readerRef = useRef(createChatReader());

  const [mainStates, setMainStates] = useState<any>({
    foundChat: null,
    materials: [],
    scanning: {
      trigger: false,
      state: MaterialStorageReadState.IDLE
    },
    showHud: {
      trigger: false,
      visible: false
    },
    crosshairs: {
      trigger: false,
      visible: false
    }
  });
  const [options, setOptions] = useLocalStorage<ArchHelperOptions>('arch_helper', createArchHelperOptions());
  const matsReaderRef = useRef(createMaterialsReader());

  const {showHud, scanning, foundChat, crosshairs} = mainStates;

  const resetMats = () => {
    const archHelperOptions = createArchHelperOptions();
    setOptions(archHelperOptions);
    matsReaderRef.current.materialsData = archHelperOptions.materialsData;
    displayMessage("Material Storage data reset", "arch_scan", 3000, 20, mixColor(255, 255, 0));
  };

  useEffect(() => {
    if (crosshairs.trigger) {
      toggleCrosshairs(crosshairs.visible);
      setMainStates((ms) => ({...ms, crosshairs: {...ms.crosshairs, trigger: false}}))
    }
  }, [mainStates]);

  useEffect(() => {
    if (showHud.trigger) {
      if (showHud.visible) {
        console.log("displayMaterials");
        displayMaterials(options.shapedData(), 'arch_hud', 5);
      } else {
        hide('arch_hud');
      }
      setMainStates((ms) => ({...ms, showHud: {...ms.showHud, trigger: false}}));
    }
  }, [showHud, options]);


  useEffect(() => {
    const tick = () => {
      try {
        if (scanning.trigger) {
          if (matsReaderRef.current.currentReadState === MaterialStorageReadState.IDLE) {
            matsReaderRef.current.start()
          } else {
            const readState: ReadState = matsReaderRef.current.read();
            let running = matsReaderRef.current.running();
            if (running) {
              if (readState.status) {
                if (readState.state !== scanning.state) {
                  const duration = matsReaderRef.current.running() ? 0 : 5000;
                  clearMessage("arch_scan");
                  displayMessage(readState.detail, "arch_scan", duration, 20, mixColor(0, 255, 0));
                  setMainStates((ms) => ({
                    ...ms,
                    scanning: {trigger: matsReaderRef.current.running(), state: readState.state}
                  }));
                }
              } else {
                displayMessage("Something went wrong", "error", 3000, 20, mixColor(255, 32, 32));
                setMainStates((ms) => ({...ms, scanning: {trigger: false, state: readState.state}}));
              }
            } else {
              clearMessage("arch_scan");
              const new_options = new ArchHelperOptions(readState.materials, materialStorageSort, "NONE");
              setOptions(new_options);
              displayMessage(readState.detail, "arch_scan", 5000, 20);
              setMainStates((ms) => ({...ms, showHud:{trigger: true, visible:true}, scanning: {trigger: false, state: readState.state}}));
            }
          }
        }
      } catch (error) {
        console.log(error)
        displayMessage("An error has occured: " + error, "error", 3000, 20, mixColor(255, 32, 32));
      }
    };
    const tickInterval = setInterval(tick, 500)

    return () => clearInterval(tickInterval)
  }, [mainStates]);

  useEffect(() => {
    const tick = () => {
      try {
        let chatLines = readerRef.current.read()

        if (chatLines === null) {
          console.log("locating chatbox")

          const findResult = readerRef.current.find()

          if (findResult && !foundChat && readerRef.current.pos) {
            console.log("Found chatbox");
            setMainStates((ms) => ({...ms, foundChat: findResult}));
            alt1.overLayRect(
              mixColor(45, 186, 21),
              readerRef.current.pos.mainbox.rect.x,
              readerRef.current.pos.mainbox.rect.y,
              readerRef.current.pos.mainbox.rect.width,
              readerRef.current.pos.mainbox.rect.height,
              2000,
              5
            )
          }

          if (findResult === null) {
            setMainStates((ms) => ({...ms, foundChat: findResult}));
            displayDetectionMessage("Can't detect chatbox\nPlease press enter so chatbox is highlighted for detection", 1500, 30)
            return
          }

          chatLines = readerRef.current.read() || []
        }

        if (chatLines !== []) {
          let cl = chatLines.map(c => c.text).join(' ').split(/\s(?=\[\d+:\d+:\d+\])/g);
          cl.forEach((line) => {
            if (line.trim() === "") {
              return;
            }
            console.log(`c: ${line}`);

            let found = detectChatArch(line, options.materialsData);
            if (found.changes) {
              console.log("Found:", found);
              const new_options = new ArchHelperOptions(options.materialsData, options.sortOptions, options.filterOptions, options.filterOptionsArgs);
              setOptions(new_options);
              setMainStates((ms) => ({...ms, showHud: {trigger:true, visible: true}}));
            } else if (found.command.type !== null) {
              const new_options = new ArchHelperOptions(options.materialsData, found.command.args.sort, found.command.args.filter, found.command.args.filterArgs);
              setOptions(new_options);
              setMainStates((ms) => ({...ms, showHud: {trigger:true, visible: true}}));
              console.log("Detected possible sort/filter: ", found.command);
            }
          });
        }
      } catch (error) {
        console.log(error)
        displayDetectionMessage("An error has occured: " + error, 1500)
      }
    }

    const tickInterval = setInterval(tick, 1000)

    return () => clearInterval(tickInterval)
  }, [mainStates, options])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        minHeight: "100%",
        minWidth: "100%",
        backgroundImage: "url(./background.png)"
      }}
    >
      <div className={"arch-container container"}>
        <div className={"row fixed-bottom"}>
          <div className={"col"}>
            <div className="list-group">
              <button autoFocus={false} onClick={() => {
                if (scanning.trigger) {
                  setMainStates((ms) => ({
                    ...ms,
                    scanning: {trigger: !scanning.trigger, state: MaterialStorageReadState.IDLE}
                  }));
                  clearMessage("arch_scan");
                  displayMessage("Scanning stopped", "arch_scan", 3000, 20, mixColor(255, 32, 32));
                } else {
                  setMainStates((ms) => ({
                    ...ms,
                    scanning: {trigger: !scanning.trigger, state: MaterialStorageReadState.IDLE}
                  }));
                  clearMessage("arch_scan");
                  displayMessage("Scanning started", "arch_scan", 1000, 20, mixColor(67, 188, 188));
                }
              }} className="nisbutton" type="button">
                {scanning.trigger ? STOP_SCANNING : SCAN_MATERIAL_STORAGE}
              </button>
              <button className="nisbutton2" onClick={() => {
                resetMats();
              }} type="button">
                Clear
              </button>
              <button className={"nisbutton2"} onClick={() => screenshot()} type="button">
                Screenshot
              </button>
              <button className={"nisbutton2"} onClick={() => setMainStates((ms) => ({...ms, crosshairs: {trigger: true, visible: !crosshairs.visible}}))} type="button">
                Toggle Crosshairs
              </button>
              <button className={"nisbutton2"} onClick={() => setMainStates((ms) => ({...ms, showHud: {trigger: true, visible: !showHud.visible}}))} type="button">
                Toggle HUD
              </button>
              <button className={"nisbutton2"} data-toggle={"collapse"} data-target={"#filtersort"} role={"button"}>
                Filters/Sorts
              </button>
              <div className={'collapse list-group'} id={"filtersort"}>
                <button className="nisbutton" onClick={() => {
                  const new_options = new ArchHelperOptions(options.materialsData, materialStorageSort, "NONE");
                  setOptions(new_options)
                  setMainStates((ms) => ({...ms, showHud: {trigger: true, visible: false}}));
                }}>
                  No Filter
                </button>
                <button className="nisbutton" onClick={() => {
                  let found = {command: sortByLastSite()}
                  const new_options = new ArchHelperOptions(options.materialsData, found.command.args.sort, found.command.args.filter, found.command.args.filterArgs);
                  setOptions(new_options);
                  setMainStates((ms) => ({...ms, showHud: {trigger: true, visible: false}}));
                }}>
                  Last Site
                </button>
                <button className="nisbutton" onClick={() => {
                  const new_options = new ArchHelperOptions(options.materialsData, materialStorageSort, "RECENT_10_MIN");
                  setOptions(new_options)
                  setMainStates((ms) => ({...ms, showHud: {trigger: true, visible: false}}));
                }}>
                  Recent (10 mins)
                </button>
                <button className="nisbutton" onClick={() => {
                  const new_options = new ArchHelperOptions(options.materialsData, materialStorageSort, "RECENT_3");
                  setOptions(new_options)
                  setMainStates((ms) => ({...ms, showHud: {trigger: true, visible: false}}));
                }}>
                  Recent 3
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const notFound = (
  <div className="App">
    <h1>ALT1 not found</h1>
  </div>
)

const rootElement = document.getElementById("root")
ReactDOM.render(alt1 ? <App/> : notFound, rootElement)

if (window['webkitNotifications']) {
  console.log('Your browser supports Notifications');
} else {
  console.log("Your browser doesn't support Notifications =(");
}
if (window.alt1) {
  //tell alt1 about the app
  //this makes alt1 show the add app button when running inside the embedded browser
  //also updates app settings if they are changed
  alt1.identifyAppUrl("./appconfig.json");
}
