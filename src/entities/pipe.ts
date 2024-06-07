class PipeElement {

  public maxDelivery: number = 0;
  public level: number = 0;
  public img: string = "assets/pipe.png";
  public price: number = 20;

  public constructor() {}

  public upgrade() {
    this.level++;
    this.maxDelivery = this.level * 0.5;
    this.price = this.level * 1.8;
  }
}
