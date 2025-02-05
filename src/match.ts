import { Matrix, Point, Result } from './models';
import { findMean, findTranspose } from './utils';

export function match2dPoints(source: Point[], target: Point[]): Result {
  computeNTDGrid(source)
  return {
    translation: [0, 0],
    rotation: 10
  }
}

function computeNTDGrid(points: Point[], gridSize = 20) {
  const grid: {[key: string]: Point[]} = {};
  for (let point of points) {
    const key: string = point.map((v) => Math.round(v / gridSize)).join(',');
    if (!(key in grid)) {
      grid[key] = []
    }
    grid[key].push(point)
  }

  const gaussian = {};
  for (let key in grid) {
    const list: Point[] = grid[key];
    const mean: Point = findMean(list);
    const transposed: Matrix = findTranspose(list);
    console.log(11, list, 22, transposed)
  }
  // for key, pts in grid.items():
  //     pts = np.array(pts)
  //     mean = np.mean(pts, axis=0)
  //     cov = np.cov(pts.T) if len(pts) > 1 else np.eye(2) * 0.01  # Avoid singular matrices
  //     gaussians[key] = (mean, cov)
}
