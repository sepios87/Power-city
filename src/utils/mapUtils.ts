import { GameMap } from "../entities/gameMap";
import { PowerElement } from "../entities/powerElement";

function generateMap(map: GameMap, element: HTMLElement, onClickCell: (x: number, y: number) => void): HTMLElement {
    const mapGrid = document.createElement("div");
    mapGrid.style.display = "grid";
    mapGrid.style.gridTemplateColumns = `repeat(${map.width}, 1fr)`;
    mapGrid.style.gridTemplateRows = `repeat(${map.height}, 50px)`;

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
            cell.style.border = "1px solid black";
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
    item.style.gridRow = `${x+ 1} / span ${selectedElement.size.height}`;
    item.style.gridColumn = `${y + 1} / span ${selectedElement.size.width}`;
    item.style.backgroundImage = `url(${selectedElement.img})`;
    item.style.backgroundSize = "contain";
    item.style.backgroundRepeat = "no-repeat",
    item.style.backgroundPosition = "center";
    item.style.backgroundColor = "rgba(0, 0, 0, 0.3)";

    // get element parent
    mapGridElement?.appendChild(item);
}

function checkCollision(x: number, y: number, map: GameMap, selectedItem: PowerElement): boolean {
    for (const itemPosition of map.elements.keys()) {
       const item = map.elements.get(itemPosition)!;
       if (itemPosition.x < x + selectedItem.size.width &&
           itemPosition.x + item.size.width > x &&
           itemPosition.y < y + selectedItem.size.height &&
           itemPosition.y + item.size.height > y) {
               return true;
           }
    }

    return false;
}

export { generateMap, addItemOnMap, checkCollision };