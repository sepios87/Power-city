import { GameMap } from "./entities/gameMap";
import { GameRepository } from "./repositories/game";
import { generateMap } from "./utils/mapUtils";

import "/src/styles/reset.css";
import "/src/styles/style.scss";
import "/src/styles/gameContext.scss";

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
    } catch (error) {
        console.error(error);
    }
}