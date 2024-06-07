import { Size } from "./size";

abstract class PowerElement {
    public abstract production: number;
    public abstract price: number;
    public abstract name: string;
    public abstract size: Size;
    public abstract isAquatic: boolean;
}

class WindTurbine extends PowerElement {
    public production: number = 1;
    public price: number = 10;
    public name: string = "Wind Turbine";
    public size: Size = new Size(1, 1);
    public isAquatic: boolean = false;
}

class NuclearPlant extends PowerElement {
    public production: number = 5;
    public price: number = 50;
    public name: string = "Nuclear Plant";
    public size: Size = new Size(2, 2);
    public isAquatic: boolean = false;
}

class SolarPanel extends PowerElement {
    public production: number = 2;
    public price: number = 20;
    public name: string = "Solar Panel";
    public size: Size = new Size(1, 1);
    public isAquatic: boolean = false;
}

class HydroelectricStation extends PowerElement {
    public production: number = 3;
    public price: number = 30;
    public name: string = "Hydroelectric Station";
    public size: Size = new Size(2, 2);
    public isAquatic: boolean = true;
}

class HydroTurbine extends PowerElement {
    public production: number = 2;
    public price: number = 20;
    public name: string = "Hydro Turbin";
    public size: Size = new Size(1, 1);
    public isAquatic: boolean = true;
}

class CoalPlant extends PowerElement {
    public production: number = 3;
    public price: number = 30;
    public name: string = "Coal Plant";
    public size: Size = new Size(2, 2);
    public isAquatic: boolean = false;
}

export { PowerElement, WindTurbine, NuclearPlant, SolarPanel, HydroelectricStation, HydroTurbine, CoalPlant };