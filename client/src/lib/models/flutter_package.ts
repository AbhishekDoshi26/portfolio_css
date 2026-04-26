export class FlutterPackage {
  public readonly name: string;
  public readonly description: string;
  public readonly github: string;
  public readonly pub: string;
  public readonly stars: string;

  constructor({
    name,
    description,
    github,
    pub,
    stars,
  }: {
    name: string;
    description: string;
    github: string;
    pub: string;
    stars: string;
  }) {
    this.name = name;
    this.description = description;
    this.github = github;
    this.pub = pub;
    this.stars = stars;
  }
}
