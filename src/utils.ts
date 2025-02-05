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

export function findCovariance(data: Matrix): Matrix {
  const numVars = data.length; // Number of variables (rows)
  const numSamples = data[0].length;

  // console.log('data', data)

  // console.log('numVars', numVars, 'numSamples', numSamples)

  const means = data.map(findMean);
  const covMatrix = Array(numVars).fill(0).map(() => Array(numVars).fill(0));

  for (let i = 0; i < numVars; i++) {
    for (let j = 0; j < numVars; j++) {
      let sum = 0;
      for (let k = 0; k < numSamples; k++) {
        sum += (data[i][k] - means[i]) * (data[j][k] - means[j]);
        // console.log('sum', sum)
      }
      covMatrix[i][j] = sum / (numSamples - 1);
    }
  }

  // console.log('covMatrix', covMatrix)

  return covMatrix;
}

export function findGrid(points: Point[], gridSize = 100): Grid {
  const grid: {[key: string]: Point[]} = {};
  for (const point of points) {
    const key: string = point.map((v) => Math.round(v / gridSize)).join(',');
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