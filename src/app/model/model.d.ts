export interface Draft {
  name: string;
  description: string;
  format: string;
  page: Page;
}

export interface Page {
  panels: Panel[]
}

export interface Element {
  x: number;
  y: number;
  z: number;
  scale: number;
  flip: boolean;
  rotation: number;
}

export interface Image extends Element {
  src: string;
}

export interface Bubble extends Element {
  text: string;
  format: string;
}

export interface Character extends Element {
  face: number;
  pose: number;
  angle: number;
  hair: number;
}

export interface Panel {
  characters: Character[];
  bubble: Bubble[];
  background?: Image;
  effects: Image[];
}


