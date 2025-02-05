import { Matrix, Point } from './models';

export function findMean(points: Point[]): Point {
  const agg: Point = points.reduce((acc: Point, next: Point) => {
    return [acc[0] + next[0], acc[1] + next[1]]
  }, [0, 0]);

  return [agg[0] / points.length, agg[1] / points.length];
}

export function findTranspose(matrix: Matrix): Matrix {
  if (matrix.length === 0) return [];
  
  const numRows = matrix.length;
  const numCols = Math.max(...matrix.map(row => row.length));

  const result: Matrix = Array.from({ length: numCols }, () => []);

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      result[j][i] = matrix[i][j];
    }
  }

  return result;
}
