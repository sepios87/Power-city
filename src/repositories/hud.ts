
export class HudRepository {

    private static instance: HudRepository;

    private constructor() {
    }

    // Méthode statique pour obtenir l'instance
    public static getInstance(): HudRepository {
        if (!HudRepository.instance) {
            HudRepository.instance = new HudRepository();
        }
        return HudRepository.instance;
    }

    // Set visual coins
    public setVisualCoins(coins: number) {
        document.getElementById("game-data-coins")!.innerText = coins.toString(); 
    }

    
    // Set visual coins
    public setVisualTime(times: number) {
        document.getElementById("game-data-time")!.innerText = `${times}h`;

        this.setVisualImage(times); 
    }

    // setVisualPowerDelivered
    public setVisualPowerDelivered(powerDelivered: number) {
        const progress = document.getElementById('progress-bar-power') as HTMLProgressElement;
        if (progress) progress.value = Math.round(powerDelivered);
        const value = document.getElementById('value-power') as HTMLSpanElement;
        if (value) value.innerText = Math.round(powerDelivered).toString();
    }

    // setVisualPowerNeeded
    public setVisualPowerNeeded(powerNeeded: number) {
        const progress = document.getElementById('progress-bar-power-needed') as HTMLProgressElement;
        if (progress) progress.value = Math.round(powerNeeded);
        const value = document.getElementById('value-power-needed') as HTMLSpanElement;
        if (value) value.innerText = Math.round(powerNeeded).toString();
    }

    // SetVisualDays
    public setVisualDays(days: number) {
        document.getElementById("game-data-days")!.innerText = `${days}j`; 
    }

    // SetVisualCitizens
    public setVisualCitizens(citizens: number) {
        document.getElementById("game-data-number-citizens")!.innerText = citizens.toString(); 
    }

    // SetVisualImage
    public setVisualImage(times: number) {
        let img = "assets/night_city.png";

        if(times < 6 ){
            img = "assets/city/night_city.png";
        }else if(times <= 10) {
            img = "assets/city/morning_city.png";
        } else if(times <= 18) {
            img = "assets/city/day_city.png";
        }else if(times <= 22) {
            img = "assets/city/sunset_city.png";
        }else{
            img = "assets/city/night_city.png";
        }

        document.getElementById("image-village")!.setAttribute("src", img); 
    }
}