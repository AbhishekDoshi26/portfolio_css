import { Stat } from "../models";

export class AppStats {
  private constructor() {}

  static readonly stats: Stat[] = [
    new Stat({ number: "20", label: "Happy Clients" }),
    new Stat({ number: "7", label: "Years of Experience" }),
    new Stat({ number: "62", label: "Incredible Projects" }),
  ];
}
