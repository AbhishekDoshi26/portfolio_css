import { FlutterPackage } from "../models";

export class AppFlutterPackages {
  private constructor() {}

  static readonly packages: FlutterPackage[] = [
    new FlutterPackage({
      name: "contactus",
      description:
        "A package which helps developers to add their contact information with ease. Includes support for website, email, phone number, and more.",
      github: "https://github.com/AbhishekDoshi26/contactus",
      pub: "https://pub.dev/packages/contactus",
      stars: "65+",
    }),
    new FlutterPackage({
      name: "parent_child_checkbox",
      description:
        "A Flutter package that establishes hierarchy in checkboxes, creating parent-child relationships with synchronized selection states.",
      github: "https://github.com/AbhishekDoshi26/parent-child-checkbox",
      pub: "https://pub.dev/packages/parent_child_checkbox",
      stars: "40+",
    }),
    new FlutterPackage({
      name: "super_extensions",
      description:
        "A comprehensive Flutter package that supports the most commonly used extension methods to boost development productivity.",
      github: "https://github.com/AbhishekDoshi26/super_extensions",
      pub: "https://pub.dev/packages/super_extensions",
      stars: "10+",
    }),
  ];
}
