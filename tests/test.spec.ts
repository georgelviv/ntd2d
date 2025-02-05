import { expect, describe, it, beforeAll } from '@jest/globals';
import path from 'node:path';
import { match2dPoints, Point } from '../src';
import { readCsvPoints } from './utils';

const basePointsPath = path.join(__dirname, './data/test1a.csv');
const transomedPointsPath = path.join(__dirname, './data/test1b.csv');

let basePoints: Point[];
let transomedPoints: Point[];

beforeAll(async () => {
  basePoints = await readCsvPoints(basePointsPath);
  transomedPoints = await readCsvPoints(transomedPointsPath);
});

describe('match2dPoints', () => {
  it('should return', () => {
    expect(match2dPoints(basePoints, transomedPoints)).toEqual({
      translation: [0, 0],
      rotation: 10
    })
  })
});