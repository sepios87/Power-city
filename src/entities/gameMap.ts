import { Position } from "./position";
import { PowerElement } from "./powerElement";

export class GameMap {
    constructor(public width: number, public height: number) {}

    public elements: Map<Position, PowerElement> = new Map();

    public get totalProduction() {
        return [...this.elements.values()].reduce((acc, element) => acc + element.production, 0);
    }
}