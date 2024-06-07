import { GameMap } from "../entities/gameMap";
import { PowerElement } from "../entities/powerElement";

function generateMap(map: GameMap, element: HTMLElement, onClickCell: (x: number, y: number) => void): HTMLElement {
    const mapGrid = document.createElement("div");
    mapGrid.style.display = "grid";
    mapGrid.style.width = "100%";
    mapGrid.style.height = "100%";
    mapGrid.style.gridTemplateColumns = `repeat(${map.width}, 1fr)`;
    mapGrid.style.gridTemplateRows = `repeat(${map.height}, 1fr)`;

    const itemsMapGrid = mapGrid.cloneNode(true) as HTMLElement;
    itemsMapGrid.style.position = "absolute";
    itemsMapGrid.style.top = "0";
    itemsMapGrid.style.left = "0";
    itemsMapGrid.style.right = "0";
    itemsMapGrid.style.bottom = "0";
    itemsMapGrid.style.pointerEvents = "none";
    itemsMapGrid.style.userSelect = "none";
    itemsMapGrid.id = "items-grid";
    element.style.position = "relative";

    for (let i = 0; i < map.width; i++) {
        for (let j = 0; j < map.height; j++) {
            const cell = document.createElement("div");
            cell.className = "map__cell";
            cell.addEventListener("click", () => onClickCell(i, j));
            mapGrid.appendChild(cell);
        }
    }
   
    element.appendChild(mapGrid);
    element.appendChild(itemsMapGrid);

    return itemsMapGrid;
}

function addItemOnMap(x: number, y: number, mapGridElement: HTMLElement, selectedElement: PowerElement) {
    console.log("Adding item on map", x, y, selectedElement);
    const item = document.createElement("div");
    item.style.gridRow = `${x+ 1}`;
    item.style.gridColumn = `${y + 1}`;
    item.style.backgroundImage = `url(${selectedElement.img})`;
    item.style.backgroundSize = "contain";
    item.style.backgroundRepeat = "no-repeat",
    item.style.backgroundPosition = "center";

    // get element parent
    mapGridElement?.appendChild(item);
}

export { generateMap, addItemOnMap };