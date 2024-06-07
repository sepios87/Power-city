class PipeElement {

    private static instance: PipeElement;

    private constructor() {
    }

    // Méthode statique pour obtenir l'instance
    public static getInstance(): PipeElement {
        if (!PipeElement.instance) {
            PipeElement.instance = new PipeElement();
        }
        return PipeElement.instance;
    }

    public maxDelivery: number = 0;
    public level: number = 0;
    public img: string = "assets/pipe.png";
    public price: number = 20;

    public upgrade() {
        this.level++;
        this.maxDelivery = this.level * 0.5;
        this.price = this.level * 1.8;
    }
}

export default PipeElement;
