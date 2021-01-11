import * as THREE from 'three';

export interface ITextSpriteOptions {
  x: number;
  y: number;
  z: number;
  text: string;
  textAlign?: 'left' | 'center' | 'right';
  textBaseline?: 'top' | 'middle' | 'bottom';
  size: number;
  color: string;
  opacity: number;
}

function createTextSprite(options: ITextSpriteOptions): THREE.Object3D | undefined {
  options = options || {};
  const { opacity = 0.6, size = 10 } = options;

  const textObject = new THREE.Object3D();
  const textHeight = 100;
  let textWidth = 0;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return undefined;

  context.font = `normal ${textHeight}px Arial`;

  const metrics = context.measureText(options.text);
  textWidth = metrics.width;

  canvas.width = textWidth;
  canvas.height = textHeight;

  context.font = `normal ${textHeight}px Arial`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = options.color;
  context.fillText(options.text, textWidth / 2, textHeight / 2);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: opacity
  });

  const height = size;
  const width = (textWidth / textHeight) * height;

  // textObject.textHeight = size;
  // textObject.textWidth = (textWidth / textHeight) * textObject.textHeight;

  // Position X
  if (options.textAlign === 'left') {
    textObject.position.x = options.x + (width / 2);
  } else if (options.textAlign === 'right') {
    textObject.position.x = options.x - (width / 2);
  } else {
    textObject.position.x = options.x || 0;
  }

  // Position Y
  if (options.textBaseline === 'top') {
    textObject.position.y = options.y - (height / 2);
  } else if (options.textBaseline === 'bottom') {
    textObject.position.y = options.y + (height / 2);
  } else {
    textObject.position.y = options.y || 0;
  }

  // Position Z
  textObject.position.z = options.z || 0;

  const sprite = new THREE.Sprite(material);
  sprite.scale.set(textWidth / textHeight * size, size, 1);

  textObject.add(sprite);

  return textObject;
}

export default createTextSprite;
