export class Skill {
  public readonly title: string;
  public readonly description: string;

  constructor({ title, description }: { title: string; description: string }) {
    this.title = title;
    this.description = description;
  }
}
