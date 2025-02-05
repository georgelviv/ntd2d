import { expect, describe, it, beforeAll, xit } from '@jest/globals';
import path from 'node:path';
import { ndt, Point } from '../src';
import { readCsvPoints } from './utils';
import { findGrid, findPointsMean } from '../src/utils';

const basePointsPath = path.join(__dirname, './data/test8a.csv');
const transomedPointsPath = path.join(__dirname, './data/test8b.csv');

let basePoints: Point[];
let transomedPoints: Point[];

beforeAll(async () => {
  basePoints = await readCsvPoints(basePointsPath);
  transomedPoints = await readCsvPoints(transomedPointsPath);
});

describe('ndt', () => {
  xit('should return', () => {
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
});

describe('findPointsMean', () => {
  it('should find mean', () => {
    expect(findPointsMean([[10, 10], [20, 20]])).toEqual([15, 15]);
  });
});