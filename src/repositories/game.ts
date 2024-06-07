class GameRepository {
    constructor(public coins: number, public map: GameMap) { }
    public days: number = 0;
    public time: number = 0;
    public powerDelivered: number = 0;
    public powerNeeded: number = 0;
    public maxPowerNeeded: number = 0;
    public numberCitizens: number = 0;
}