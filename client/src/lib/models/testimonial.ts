export class Testimonial {
  public readonly name: string;
  public readonly position: string;
  public readonly testimonial: string;
  public readonly linkedin: string;

  constructor({
    name,
    position,
    testimonial,
    linkedin,
  }: {
    name: string;
    position: string;
    testimonial: string;
    linkedin: string;
  }) {
    this.name = name;
    this.position = position;
    this.testimonial = testimonial;
    this.linkedin = linkedin;
  }
}
