import { Grid, Matrix, Point } from './models';

export function findPointsMean(points: Point[]): Point {
  const agg: Point = points.reduce((acc: Point, next: Point) => {
    return [acc[0] + next[0], acc[1] + next[1]];
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

export function findCovarianceMatrix(data: Matrix): Matrix {
  const means: number[] = data.map(findMean);
  const variances: number[] = data.map((v: number[], i: number) => {
    const mean: number = means[i];
    return v.reduce((acc: number, next: number) => {
      return acc + ((next - mean) ** 2);
    }, 0) / v.length;
  });

  const varCount: number = data.length;
  const varLength: number = data[0].length;

  const covMatrix: Matrix = Array.from({ length: varCount }).map(() => {
    return Array.from({ length: varCount }).fill(0);
  }) as Matrix;

  for (let i = 0; i < varCount; i++) {
    for (let j = 0; j < varCount; j++) {
      if (i === j) {
        covMatrix[i][j] = variances[i];
      } else {

        let covariance: number = 0;
        for (let k = 0; k < varLength; k++) {
          const x = data[i][k] - means[i];
          const y = data[j][k] - means[j];

          covariance += x * y;
        }

        covariance /= varLength;
        covMatrix[i][j] = covariance;
      }
    }
  }

  return covMatrix;
}

export function findGrid(points: Point[], gridSize = 100, shift: Point = [0, 0]): Grid {
  const grid: {[key: string]: Point[]} = {};
  for (const point of points) {
    const key: string = point.map((v: number, i: number) => {
      const x = (v - shift[i] * gridSize);
      return Math.round(x / gridSize);
    }).join(',');
    if (!(key in grid)) {
      grid[key] = [];
    }
    grid[key].push(point);
  }

  return grid;
} 

function findMean(arr: number[]): number {
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

export function findMatrixMinor(matrix: Matrix, row: number, col: number): Matrix {
  return matrix.filter((_, i) => i !== row).map(r => r.filter((_, j) => j !== col));
}

export function findDeterminant(matrix: Matrix): number {
  if (matrix.length === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }
  let det = 0;
  for (let i = 0; i < matrix.length; i++) {
    det += ((i % 2 === 0 ? 1 : -1) * matrix[0][i] * findDeterminant(findMatrixMinor(matrix, 0, i)));
  }
  return det;
}

export function findCofactor(matrix: Matrix, row: number, col: number): number {
  return Math.pow(-1, row + col) * findDeterminant(findMatrixMinor(matrix, row, col));
}

export function findInverseMatrix(matrix: Matrix): Matrix {
  const det = findDeterminant(matrix);
  if (matrix.length === 2) {
    // Inverse of a 2x2 matrix
    return [
      [matrix[1][1] / det, -matrix[0][1] / det],
      [-matrix[1][0] / det, matrix[0][0] / det]
    ];
  }
  // General inverse for larger matrices
  const cofactors = matrix.map((row, i) =>
    row.map((_, j) => findCofactor(matrix, i, j))
  );
  const adjugate = findTranspose(cofactors);
  return adjugate.map(row => row.map(val => val / det));
}

export function findMultivariateNormalPD(x: Point, mean: Point, covariance: Matrix): number {
  const d = mean.length;
  const covDet = findDeterminant(covariance);
  const covInv = findInverseMatrix(covariance);
  
  const diff = x.map((val, i) => val - mean[i]);
  
  let exponent = 0;
  for (let i = 0; i < d; i++) {
    for (let j = 0; j < d; j++) {
      exponent += diff[i] * covInv[i][j] * diff[j];
    }
  }
  
  const normalization = 1 / (Math.pow(2 * Math.PI, d / 2) * Math.sqrt(covDet));
  return normalization * Math.exp(-0.5 * exponent);
}