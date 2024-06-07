
export class HubRepository {

    private static instance: HubRepository;

    private constructor() {
    }

    // Méthode statique pour obtenir l'instance
    public static getInstance(): HubRepository {
        if (!HubRepository.instance) {
            HubRepository.instance = new HubRepository();
        }
        return HubRepository.instance;
    }

    // Set visual coins
    public setVisualCoins(coins: number) {
        document.getElementById("game-data-coins")!.innerText = coins.toString(); 
    }

    
    // Set visual coins
    public setVisualTime(times: number) {
        document.getElementById("game-data-time")!.innerText = times.toString(); 
    }

    // setVisualPowerDelivered
    public setVisualPowerDelivered(powerDelivered: number) {
        // TODO 
    }

    // setVisualPowerNeeded
    public setVisualPowerNeeded(powerNeeded: number) {
        // TODO 
    }

    // SetVisualDays
    public setVisualDays(days: number) {
        document.getElementById("game-data-days")!.innerText = days.toString(); 
    }

    // SetVisualCitizens
    public setVisualCitizens(citizens: number) {
        document.getElementById("game-data-citizens")!.innerText = citizens.toString(); 
    }

}