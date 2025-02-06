import { expect, describe, it, beforeAll } from '@jest/globals';
import path from 'node:path';
import {
  ndt, Point, findCovarianceMatrix,
  findGrid, findPointsMean, findTranspose,
  computeNTDGrid,
  findMatrixMinor,
  findDeterminant,
  findCofactor,
  findInverseMatrix
} from '../src';
import { readCsvPoints } from './utils';

const basePointsPath = path.join(__dirname, './data/test8a.csv');
const transomedPointsPath = path.join(__dirname, './data/test8b.csv');

let basePoints: Point[];
let transomedPoints: Point[];

beforeAll(async () => {
  basePoints = await readCsvPoints(basePointsPath);
  transomedPoints = await readCsvPoints(transomedPointsPath);
});

describe('ndt', () => {
  it('should return', () => {
    expect(ndt(basePoints, transomedPoints)).toEqual({
      translation: [0, 0],
      rotation: 10
    });
  });
});

describe('findGrid', () => {
  it('should find proper grid', () => {
    expect(findGrid([[10, 10], [11, 11], [13, 13]], 1)).toEqual({
      ['10,10']: [[10, 10]],
      ['11,11']: [[11, 11]],
      ['13,13']: [[13, 13]]
    });

    expect(findGrid([[5, 5], [6, 5], [12, 13]], 5)).toEqual({
      ['1,1']: [[5, 5], [6, 5]],
      ['2,3']: [[12, 13]],
    });
  });

  it('should find proper shifted grid', () => {
    expect(findGrid([[1, 1], [1.5, 1.5], [2, 2]], 1)).toEqual({
      ['1,1']: [[1, 1]],
      ['2,2']: [[1.5, 1.5], [2, 2]]
    });

    expect(findGrid([[1, 1], [1.5, 1.5], [2, 2]], 1, [0.5, 0.5])).toEqual({
      ['1,1']: [[1, 1], [1.5, 1.5]],
      ['2,2']: [[2, 2]]
    });
  });
});

describe('findPointsMean', () => {
  it('should find mean', () => {
    expect(findPointsMean([[10, 10], [20, 20]])).toEqual([15, 15]);
  });
});

describe('findTranspose', () => {
  it('should transpose matrix', () => {
    expect(findTranspose([[1, 2], [3, 4], [5, 6]])).toEqual([
      [1, 3, 5],
      [2, 4, 6]
    ]);
  });
});

describe('findCovarianceMatrix', () => {
  it('should return covariance matrix', () => {
    expect(findCovarianceMatrix([[2, 4, 6], [50, 55, 65],  [1, 3, 5]]))
      .toEqual([
        [2.6666666666666665, 10, 2.6666666666666665],
        [10, 38.88888888888889, 10],
        [2.6666666666666665, 10, 2.6666666666666665]
      ]);
  });
});

describe('computeNTDGrid', () => {
  it('should return obstacles grid with mean and covariance matrix', () => {
    expect(computeNTDGrid([
      [10, 10], [11, 10], [10, 11], [20, 10], [20, 11], [21, 10]
    ], 5)).toEqual({
      "2,2": {
        covariance: [[0.2222222222222222, -0.11111111111111112], [-0.11111111111111112, 0.2222222222222222]], 
        mean: [10.333333333333334, 10.333333333333334],
        points: [[10, 10], [11, 10], [10, 11]]
      },
      "4,2": {
        covariance: [[0.22222222222222224, -0.11111111111111112], [-0.11111111111111112, 0.2222222222222222]],
        mean: [20.333333333333332, 10.333333333333334],
        points: [[20, 10], [20, 11], [21, 10]]
      }
    });
  });
});

describe('findMatrixMinor', () => {
  it('should return matrix minor', () => {
    expect(findMatrixMinor([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ], 0, 0)).toEqual([
      [5, 6],
      [8, 9]
    ]);
  });
});

describe('findDeterminant', () => {
  it('should find matrix determinant', () => {
    expect(findDeterminant([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ])).toEqual(0);

    expect(findDeterminant([
      [2, 3, 1],
      [4, 5, 6],
      [7, 8, 9]
    ])).toBe(9);
  });
});

describe('findCofactor', () => {
  it('should find matrix cofactor of give row and column', () => {
    expect(findCofactor([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ], 0, 0)).toBe(-3);

    expect(findCofactor([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ], 1, 1)).toBe(-12);
  });
});

describe('findInverseMatrix', () => {
  it('should find inverse matrix', () => {
    expect(findInverseMatrix([
      [4, 7],
      [2, 6],
    ])).toEqual([
      [0.6, -0.7],
      [-0.2, 0.4]
    ]);

    expect(findInverseMatrix([
      [1, 2, 3],
      [0, 1, 4],
      [5, 6, 0]
    ])).toEqual([
      [-24, 18, 5],
      [20, -15, -4],
      [-5, 4, 1]
    ]);
  });
});