import { NavLink } from "../models";

export class AppNavLinks {
  private constructor() {}

  static readonly links: NavLink[] = [
    new NavLink({ name: 'Home', path: '/' }),
    new NavLink({ name: 'About', path: '/about' }),
    new NavLink({ name: 'Testimonials', path: '/testimonials' }),
    new NavLink({ name: 'Packages', path: '/packages' }),
    new NavLink({ name: 'Blog', path: '/blog' }),
    new NavLink({ name: 'Contact', path: '/contact' }),
  ];
}
