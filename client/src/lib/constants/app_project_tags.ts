export class AppProjectTags {
  private constructor() {}

  static readonly tags: Record<string, { bg: string; text: string }> = {
    flutter: { bg: 'bg-primary/20', text: 'text-primary' },
    firebase: { bg: 'bg-yellow-500/20', text: 'text-yellow-500' },
    dart: { bg: 'bg-blue-500/20', text: 'text-blue-500' },
    android: { bg: 'bg-green-500/20', text: 'text-green-500' },
    ios: { bg: 'bg-pink-500/20', text: 'text-pink-500' },
    web: { bg: 'bg-purple-500/20', text: 'text-purple-500' },
  };
}
