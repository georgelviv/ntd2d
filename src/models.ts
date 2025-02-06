export type Point = [x: number, y: number];

export interface Result {
  translation: Point;
  rotation: number;
}

export type Matrix = number[][];

export type Grid = {
  [key: string]: Point[]
}

export type NTDGrid = {
  [key: string]: {
    mean: Point;
    covariance: Matrix;
    points: Point[];
  }
}