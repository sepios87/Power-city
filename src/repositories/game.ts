import { GameMap } from "../entities/gameMap";

export class GameRepository {

    public coins: number = 0;
    public map: GameMap;
    public days: number = 0;
    public time: number = 0;
    public powerDelivered: number = 0;
    public powerNeeded: number = 0;
    public maxPowerNeeded: number = 0;
    public numberCitizens: number = 0;

    public constructor(coins: number, map: GameMap) {
        this.coins = coins;
        this.map = map;
        this.powerNeeded = 50;
    }

    public incrementHour() {
        this.time = (this.time + 1) % 24;
        if (this.time === 0) {
            this.days++;
            this.updateCitizens();
        }
        this.powerNeeded = this.calculatePowerNeeded();
    }
    
    private calculatePowerNeeded() {
        let basePowerNeeded = this.calculateBasePowerNeeded();
        let hourlyFluctuation = this.calculateHourlyFluctuation();
        let randomFluctuation = this.calculateRandomFluctuation();
        return basePowerNeeded * hourlyFluctuation * randomFluctuation;
    }

    private calculateBasePowerNeeded() {
        // Base power needed increases with the number of citizens and days
        return this.numberCitizens * this.days * 10; // Example base formula
    }
    
    private calculateHourlyFluctuation() {
        if (this.time >= 8 && this.time < 12) {
            return 0.8; // 80% of max power needed
        } else if (this.time >= 18 && this.time < 22) {
            return 1.2; // 120% of max power needed
        } else {
            return 1; // 100% of max power needed
        }
    }

    private calculateRandomFluctuation() {
        // Random fluctuation between -7% and +7%
        let fluctuation = Math.random() * 0.14 - 0.07;
        return 1 + fluctuation;
    }

    private updateCitizens() {
        // Random fluctuation between -5% and +15%
        let fluctuation = Math.random() * 0.20 - 0.05;
        this.numberCitizens += Math.round(this.numberCitizens * fluctuation);
    }

}