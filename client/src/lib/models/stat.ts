export class Stat {
  public readonly number: string;
  public readonly label: string;

  constructor({ number, label }: { number: string; label: string }) {
    this.number = number;
    this.label = label;
  }
}
