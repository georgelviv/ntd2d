import { Grid, Matrix, NTDGrid, Point, Result } from './models';
import { findCovarianceMatrix, findGrid, findPointsMean, findTranspose } from './utils';

export function ndt(source: Point[], target: Point[]): Result {
  computeOverlappingNDTGrids(source);
  console.log(target);
  return {
    translation: [0, 0],
    rotation: 10
  };
};

export function computeOverlappingNDTGrids(points: Point[], gridSize = 100): NTDGrid {
  const original: NTDGrid = computeNTDGrid(points, gridSize);
  const shiftedX: NTDGrid = computeNTDGrid(points, gridSize, [0.5, 0]);
  // const shiftedY: NTDGrid = computeNTDGrid(points, gridSize, [0, 0.5]);
  // const shiftedXY: NTDGrid = computeNTDGrid(points, gridSize, [0.5, 0.5]);

  console.log(Object.keys(original), Object.keys(shiftedX));

  return original;
}

export function computeNTDGrid(points: Point[], gridSize = 100, shift: Point = [0, 0]): NTDGrid {
  const grid: Grid = findGrid(points, gridSize, shift);

  const gaussian: NTDGrid = {};
  for (const key in grid) {
    const list: Point[] = grid[key];
    const mean: Point = findPointsMean(list);
    
    let cov: Matrix = [[0.01, 0], [0, 0.01]];
    console.log(list.length);
    if (list.length >= 3) {
      const transposed: Matrix = findTranspose(list);
      cov = findCovarianceMatrix(transposed);

      gaussian[key] = {
        mean, covariance: cov, points: list
      };
    }
  }

  return gaussian;
}
