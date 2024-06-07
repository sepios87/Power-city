function generateMap(map: GameMap, element: HTMLElement) {
    element.style.display = "grid";
    element.style.gridTemplateColumns = `repeat(${map.width}, 1fr)`;
    element.style.gridTemplateRows = `repeat(${map.height}, 1fr)`;
}