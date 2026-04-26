export class SkillCategory {
  public readonly title: string;
  public readonly icon: string;
  public readonly skills: string[];

  constructor({
    title,
    icon,
    skills,
  }: {
    title: string;
    icon: string;
    skills: string[];
  }) {
    this.title = title;
    this.icon = icon;
    this.skills = skills;
  }
}
