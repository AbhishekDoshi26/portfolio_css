import { SkillCategory } from "../models";

export class AppSkillCategories {
  private constructor() {}

  static readonly categories: SkillCategory[] = [
    new SkillCategory({
      title: "Mobile Architecture",
      icon: "FaMobileAlt",
      skills: [
        "Flutter & Dart Expert",
        "Native Android Development",
        "Clean Architecture & BLoC",
        "Performance Tuning (60/120fps)",
        "App Store & Play Store Deployment",
      ],
    }),
    new SkillCategory({
      title: "Backend & Cloud",
      icon: "FaServer",
      skills: [
        "Firebase (Firestore, Functions, Auth)",
        "Node.js & Express.js",
        "RESTful API Design",
        "PostgreSQL & NoSQL",
        "Google Cloud Platform (GCP)",
      ],
    }),
    new SkillCategory({
      title: "Web Technologies",
      icon: "FaCode",
      skills: [
        "React.js & Next.js",
        "TypeScript & JavaScript (ES6+)",
        "Tailwind CSS & SASS",
        "Responsive Web Design",
        "WebAssembly (WASM) & Flutter Web",
      ],
    }),
    new SkillCategory({
      title: "UI/UX & Design",
      icon: "FaPaintBrush",
      skills: [
        "Figma & Adobe XD",
        "Material Design & Cupertino",
        "Design Systems",
        "User Experience Engineering",
        "Interactive Prototyping",
      ],
    }),
    new SkillCategory({
      title: "DevOps & Tools",
      icon: "FaTools",
      skills: [
        "Git, GitHub & GitLab CI/CD",
        "Docker & Containerization",
        "Agile & Scrum Methodologies",
        "Technical Documentation",
        "Package Maintenance (Pub.dev)",
      ],
    }),
    new SkillCategory({
      title: "Community & Leadership",
      icon: "FaGraduationCap",
      skills: [
        "Google Developer Expert (GDE)",
        "Technical Writing (Medium/Dev.to)",
        "Public Speaking & Workshops",
        "Mentoring 1000+ Developers",
        "Open Source Contributor",
      ],
    }),
  ];
}
