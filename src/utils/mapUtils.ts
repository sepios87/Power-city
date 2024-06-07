import { GameMap } from "../entities/gameMap";

function generateMap(map: GameMap, element: HTMLElement) {
    element.style.display = "grid";
    element.style.gridTemplateColumns = `repeat(${map.width}, 1fr)`;
    element.style.gridTemplateRows = `repeat(${map.height}, 50px)`;
    for (let i = 0; i < map.width; i++) {
        for (let j = 0; j < map.height; j++) {
            const cell = document.createElement("div");
            cell.style.border = "1px solid black";
            element.appendChild(cell);
        }
    }
}

export { generateMap };