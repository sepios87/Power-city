class GameMap {
    constructor(public width: number, public height: number) {}

    public elements: Map<Position, PowerElement> = new Map();
}