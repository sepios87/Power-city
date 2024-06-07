import { GameMap } from "../entities/gameMap";
import { HudRepository } from "./hud";
import { PowerElement } from "../entities/powerElement";
import PipeElement from "../entities/pipe";

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
    public pipeElement: PipeElement;

    public constructor(coins: number, map: GameMap) {
        this.coins = coins;
        this.map = map;
        this.pipeElement = PipeElement.getInstance();

        setInterval(() => this.incrementHour(), 100);
    }

    public incrementHour() {
        console.log("Incrementing hour");
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

    public buyElement(element: PowerElement | PipeElement) {
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
        const fluctuationPercentage = Math.random() * 0.1; // fluctuation de 10%
        let fluctuation = Math.round(this.numberCitizens * fluctuationPercentage);
    
        // Assurez-vous qu'au moins 1 citoyen arrive ou part
        if (fluctuation === 0) {
            fluctuation = 1;
        }
    
        // 75% de chance de gagner des citoyens, 25% d'en perdre
        if (Math.random() < 0.9) {
            this.numberCitizens += fluctuation;
        } else {
            this.numberCitizens = Math.max(0, this.numberCitizens - fluctuation);
        }
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

        const hudRepo: HudRepository = HudRepository.getInstance();

        hudRepo.setVisualCoins(this.coins);
        hudRepo.setVisualTime(this.time);
        hudRepo.setVisualPowerDelivered(this.powerDelivered);
        hudRepo.setVisualPowerNeeded(this.powerNeeded);
        hudRepo.setVisualDays(this.days);
        hudRepo.setVisualCitizens(this.numberCitizens);
        this.powerNeeded = Math.round(this.powerNeeded);
        this.powerDelivered = Math.round(this.powerDelivered);
        this.coins = Math.round(this.coins);
        this.time = Math.round(this.time);
        this.days = Math.round(this.days);
        this.numberCitizens = Math.round(this.numberCitizens);

        HudRepository.getInstance().setVisualCoins(this.coins);
        HudRepository.getInstance().setVisualTime(this.time);
        HudRepository.getInstance().setVisualPowerDelivered(this.powerDelivered);
        if (this.maxPowerNeeded != 0) {
            HudRepository.getInstance().setVisualPowerNeeded(this.powerNeeded * 120 / this.maxPowerNeeded );
        }
        HudRepository.getInstance().setVisualDays(this.days);
        HudRepository.getInstance().setVisualCitizens(this.numberCitizens);
    }
}