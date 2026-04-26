export class NavLink {
  public readonly name: string;
  public readonly path: string;

  constructor({ name, path }: { name: string; path: string }) {
    this.name = name;
    this.path = path;
  }
}
