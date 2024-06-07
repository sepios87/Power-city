import { GameMap } from "../entities/gameMap";
import { HubRepository } from "./hub";
import { PowerElement } from "../entities/powerElement";

export class GameRepository {

    public coins: number = 0;
    public strikeCounter: number = 0;
    public map: GameMap;
    public days: number = 0;
    public time: number = 0;
    public powerDelivered: number = 0;
    public powerNeeded: number = 50;
    public maxPowerNeeded: number = 0;
    public numberCitizens: number = 10;
    private hourlyFluctuation: number = 1;

    public constructor(coins: number, map: GameMap) {
        this.coins = coins;
        this.map = map;
    }

    public incrementHour() {
        this.time = (this.time + 1) % 24;
        if (this.time === 0) {
            this.days++;
            this.updateCitizens();
        }
        this.hourlyFluctuation = this.calculateHourlyFluctuation();
        this.powerNeeded = this.calculatePowerNeeded();
        this.calculateCoins();

        const powerGenerated = this.map.totalProduction;
        this.powerDelivered = Math.min(powerGenerated, this.powerNeeded);
        this.coins -= this.powerDelivered / 10;
        this.validateData();
    }

    public buyElement(element: PowerElement) {
        if (this.coins >= element.price) {
            this.coins -= element.price;
        }
    }

    private calculatePowerNeeded() {
        const basePowerNeeded = this.calculateBasePowerNeeded();
        const randomFluctuation = this.calculateRandomFluctuation();
        const powerNeeded = basePowerNeeded * this.hourlyFluctuation * randomFluctuation;
        
        if (this.hourlyFluctuation === 1.2) {
            this.maxPowerNeeded = Math.max(this.maxPowerNeeded, powerNeeded);
        }

        return powerNeeded;
    }

    private calculateBasePowerNeeded() {
        return Math.max(0, this.numberCitizens * this.days * 10);
    }

    private calculateHourlyFluctuation() {
        if (this.time >= 8 && this.time < 12) {
            return 0.8;
        } else if (this.time >= 18 && this.time < 22) {
            return 1.2;
        } else {
            return 1;
        }
    }

    private calculateRandomFluctuation() {
        const fluctuation = Math.random() * 0.14 - 0.07;
        return 1 + fluctuation;
    }

    private updateCitizens() {
        const fluctuation = Math.random() * 0.20 - 0.05;
        this.numberCitizens = Math.max(0, this.numberCitizens + Math.round(this.numberCitizens * fluctuation));
    }

    public calculateCoins() {
        const powerNeeded = this.calculateBasePowerNeeded() * this.hourlyFluctuation * this.calculateRandomFluctuation();
        const powerGenerated = this.map.totalProduction;

        if (powerGenerated >= powerNeeded * 0.85 && powerGenerated <= powerNeeded * 1.15) {
            const coinsWon = 10 * Math.pow(1.1, this.days);
            this.coins += coinsWon;

            this.strikeCounter++;
            if (this.strikeCounter >= 5) {
                this.coins += coinsWon * 0.5;
                this.strikeCounter = 0;
            }
        } else {
            this.strikeCounter = 0;
        }
    }

    private validateData() {
        this.coins = Math.max(0, this.coins);
        this.numberCitizens = Math.max(0, this.numberCitizens);
        this.powerDelivered = Math.max(0, this.powerDelivered);
        this.powerNeeded = Math.max(0, this.powerNeeded);

        HubRepository.getInstance().setVisualCoins(this.coins);
        HubRepository.getInstance().setVisualTime(this.time);
        HubRepository.getInstance().setVisualPowerDelivered(this.powerDelivered);
        HubRepository.getInstance().setVisualPowerNeeded(this.powerNeeded);
        HubRepository.getInstance().setVisualDays(this.days);
        HubRepository.getInstance().setVisualCitizens(this.numberCitizens);
    }
}