export * as backgroundImage from './backgroundImage';
export * as favicon32 from './favicon32';
export * as logo from './logo';

export function getImageUrl(image: string): string {
  return `url("${image}")`;
}
