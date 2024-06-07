import { GameMap } from "./entities/gameMap";
import { GameRepository } from "./repositories/game";
import { addItemOnMap, checkCollision, generateMap } from "./utils/mapUtils";

import "/src/styles/reset.css";
import "/src/styles/style.scss";
import "/src/styles/gameContext.scss";
import "/src/styles/map.scss";
import {
  CoalPlant,
  HydroTurbine,
  HydroelectricStation,
  NuclearPlant,
  PowerElement,
  SolarPanel,
  WindTurbine,
} from "./entities/powerElement";
import { Position } from "./entities/position";

const showItems: PowerElement[] = [
  new WindTurbine(),
  new NuclearPlant(),
  new SolarPanel(),
  new HydroelectricStation(),
  new HydroTurbine(),
  new CoalPlant(),
];

let gameRepository: GameRepository;
let selectedElement: PowerElement | null = null;
let mapGridElement: HTMLElement | null = null;

window.addEventListener("load", function () {
  onListenMouseMove();
  init();
});

function init() {
  try {
    console.log("Initializing game");
    const map = new GameMap(25, 10);
    const mapElement = document.getElementById("map");
    if (mapElement) {
      mapGridElement = generateMap(map, mapElement, onClickCellMap);
    }
    gameRepository = new GameRepository(0, map);
    const pipeElement = document.getElementById("pipe");
    if(pipeElement) {
      pipeElement.addEventListener("click", () => {
        console.log("Clicked pipe");
        gameRepository.pipeElement.upgrade();
      });
    }
    generateItems();
  } catch (error) {
    console.error(error);
  }
}

function generateItems() {
  const items = document.getElementById("items");
  const itemTemplate = document.getElementById(
    "item-template"
  ) as HTMLTemplateElement;
  if (items && itemTemplate) {
    for (const itemShow of showItems) {
      const item = itemTemplate.content.cloneNode(true) as HTMLElement;
      const itemImg = item.querySelector(".item__img");
      if (itemImg) itemImg.setAttribute("src", itemShow.img);
      const itemPrice = item.querySelector(".item-price__label");
      if (itemPrice) itemPrice.innerHTML = itemShow.price.toString();
      item.firstElementChild?.addEventListener("click", () =>
        onClickItem(itemShow)
      );
      items.appendChild(item);
    }
  }
}

function onClickItem(item: PowerElement) {
  console.log("Clicked item", item);
  unselectItem();

  selectedElement = item;
  const img = document.createElement("img");
  img.id = "selected-item";
  img.src = item.img;
  img.style.position = "fixed";
  img.style.left = "calc(var(--cursor-x) * 1px)";
  img.style.top = "calc(var(--cursor-y) * 1px)";
  img.style.transform = "translate(-50%, -50%)";
  img.style.width = "50px";
  img.style.height = "50px";
  img.style.zIndex = "1000";
  img.style.userSelect = "none";
  img.style.pointerEvents = "none";
  document.body.appendChild(img);
}

function onListenMouseMove() {
  document.addEventListener("mousemove", (event) => {
    document.documentElement.style.setProperty(
      "--cursor-x",
      String(event.clientX)
    );
    document.documentElement.style.setProperty(
      "--cursor-y",
      String(event.clientY)
    );
  });
}

function onClickCellMap(x: number, y: number) {
  console.log("Clicked cell", x, y);
  if (selectedElement && mapGridElement) {
    console.log("Clicked cell", x, y);
    const isCollision = checkCollision(
      x,
      y,
      gameRepository.map,
      selectedElement
    );
    if (isCollision) {
      console.log("Collision detected");
      return;
    }
    console.log(checkCollision(x, y, gameRepository.map, selectedElement));
    addItemOnMap(x, y, mapGridElement, selectedElement);
    gameRepository.map.elements.set(new Position(x, y), selectedElement);
    gameRepository.buyElement(selectedElement);
    unselectItem();
  }
}

function unselectItem() {
  selectedElement = null;
  const alreadySelectedItem = document.getElementById("selected-item");
  if (alreadySelectedItem) alreadySelectedItem.remove();
}
