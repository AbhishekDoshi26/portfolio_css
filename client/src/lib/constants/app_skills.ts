import { Skill } from "../models";

export class AppSkills {
  private constructor() {}

  static readonly skills: Skill[] = [
    new Skill({
      title: "Flutter",
      description:
        "7+ years of experience in Flutter, delivering premium apps for global clients.",
    }),
    new Skill({
      title: "Firebase",
      description:
        "Expertise in building scalable real-time backends and cloud infrastructures.",
    }),
    new Skill({
      title: "Technical Writing",
      description:
        "Passionate about sharing knowledge through technical blogs and documentation.",
    }),
    new Skill({
      title: "Mentorship",
      description:
        "Empowering the next generation of developers through guidance and workshops.",
    }),
  ];
}
