import { Grid, Matrix, Point, Result } from './models';
import { findCovarianceMatrix, findGrid, findPointsMean, findTranspose } from './utils';

export function ndt(source: Point[], target: Point[]): Result {
  computeNTDGrid(source);
  console.log(target);
  return {
    translation: [0, 0],
    rotation: 10
  };
};

function computeNTDGrid(points: Point[], gridSize = 100) {
  const grid: Grid = findGrid(points, gridSize);
  console.log(grid);

  const gaussian = {};
  for (let key in grid) {
    const list: Point[] = grid[key];
    const mean: Point = findPointsMean(list);
    const transposed: Matrix = findTranspose(list);
    const cov: Matrix = findCovarianceMatrix(transposed);
  }
  // for key, pts in grid.items():
  //     pts = np.array(pts)
  //     mean = np.mean(pts, axis=0)
  //     cov = np.cov(pts.T) if len(pts) > 1 else np.eye(2) * 0.01  # Avoid singular matrices
  //     gaussians[key] = (mean, cov)
}
