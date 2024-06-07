import { GameMap } from "./entities/gameMap";
import { GameRepository } from "./repositories/game";
import { generateMap } from "./utils/mapUtils";
import { HubRepository } from "./repositories/hub";

import "/src/styles/reset.css";
import "/src/styles/style.scss";
import "/src/styles/gameContext.scss";

enum ShowItems {
    WindTurbine,
    NuclearPlant,
    SolarPanel,
    HydroelectricStation,
    HydroTurbine,
    CoalPlant,
}

let gameRepository: GameRepository;

window.addEventListener("load", function () {
    init();
});

function init() {
    try {
        console.log("Initializing game");
        const map = new GameMap(10, 10);
        const mapElement = document.getElementById("map");
        if (mapElement) {
            generateMap(map, mapElement);
        }
        gameRepository = new GameRepository(0, map);
        generateItems();
    } catch (error) {
        console.error(error);
    }
}

function generateItems() {
    const items = document.getElementById("items");
    const itemTemplate = document.getElementById("item-template");
    if (items && itemTemplate) {
        const item = itemTemplate.cloneNode(true);
        for (const itemShow in ShowItems) {
            console.log(itemShow);
        }
        items.appendChild(item);
    }
}