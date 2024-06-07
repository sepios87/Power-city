import { GameMap } from "../entities/gameMap";

export class GameRepository {

    public coins: number = 0; // Nombre de pièces du joueur
    public map: GameMap; // Carte du jeu
    public days: number = 0; // Nombre de jours écoulés
    public time: number = 0; // Heure actuelle (0-23)
    public powerDelivered: number = 0; // Puissance délivrée
    public powerNeeded: number = 0; // Puissance nécessaire actuelle
    public maxPowerNeeded: number = 0; // Puissance nécessaire maximale
    public numberCitizens: number = 0; // Nombre de citoyens

    public constructor(coins: number, map: GameMap) {
        this.coins = coins;
        this.map = map;
        this.powerNeeded = 50; // Puissance nécessaire initiale
    }

    public incrementHour() {
        this.time = (this.time + 1) % 24; // Incrémente l'heure et la remet à 0 si elle atteint 24
        if (this.time === 0) {
            this.days++; // Incrémente le nombre de jours
            this.updateCitizens(); // Met à jour le nombre de citoyens
        }
        this.powerNeeded = this.calculatePowerNeeded(); // Calcule la nouvelle puissance nécessaire
    }
    
    private calculatePowerNeeded() {
        let basePowerNeeded = this.calculateBasePowerNeeded(); // Calcule la puissance de base nécessaire
        let hourlyFluctuation = this.calculateHourlyFluctuation(); // Calcule la fluctuation horaire
        let randomFluctuation = this.calculateRandomFluctuation(); // Calcule la fluctuation aléatoire
        return basePowerNeeded * hourlyFluctuation * randomFluctuation; // Calcule la puissance nécessaire totale
    }

    private calculateBasePowerNeeded() {
        // La puissance de base nécessaire augmente avec le nombre de citoyens et les jours écoulés
        return this.numberCitizens * this.days * 10; // Exemple de formule de base
    }
    
    private calculateHourlyFluctuation() {
        if (this.time >= 8 && this.time < 12) {
            return 0.8; // 80% de la puissance nécessaire maximale
        } else if (this.time >= 18 && this.time < 22) {
            return 1.2; // 120% de la puissance nécessaire maximale
        } else {
            return 1; // 100% de la puissance nécessaire maximale
        }
    }

    private calculateRandomFluctuation() {
        // Fluctuation aléatoire entre -7% et +7%
        let fluctuation = Math.random() * 0.14 - 0.07;
        return 1 + fluctuation;
    }

    private updateCitizens() {
        // Fluctuation aléatoire entre -5% et +15%
        let fluctuation = Math.random() * 0.20 - 0.05;
        this.numberCitizens += Math.round(this.numberCitizens * fluctuation);
    }

}
