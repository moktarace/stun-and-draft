export interface Draft {
  name: string;
  description: string;
  width: number;
  height: number;
  margin: number;
  grid: number;
  version? : string;
  pages: Page[];
}

export interface Page {
  panels: Panel[]
}

export interface Element {
  x: number;
  y: number;
  z: number;
  scale: number;
  flipX: boolean;
  flipY: boolean;
  rotation: number;
}

export interface Image extends Element {
  format: string;
  type?: string;
}

export interface Bubble extends Image {
  text: string;
}

export interface Character extends Element {
  face: string;
  pose: string;
  angle: string;
  hair: string;
}

export interface Panel {
  col: number;
  row: number;
  colSize: number;
  rowSize: number;
  characters: Character[];
  bubble: Bubble[];
  background?: Image;
  effects: Image[];
  sounds: Image[];
  items: Image[];
  signs: Image[];
  comments: Comment[];
}


