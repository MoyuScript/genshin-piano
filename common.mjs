import { keyboard } from '@nut-tree/nut-js';

keyboard.config.autoDelayMs = 1;

const KEY_TO_PITCH = {
  z: 48,
  x: 50,
  c: 52,
  v: 53,
  b: 55,
  n: 57,
  m: 59,
  a: 60,
  s: 62,
  d: 64,
  f: 65,
  g: 67,
  h: 69,
  j: 71,
  q: 72,
  w: 74,
  e: 76,
  r: 77,
  t: 79,
  y: 81,
  u: 83,
};

const PITCH_TO_KEY = {};

Object.entries(KEY_TO_PITCH).forEach(([k, v]) => {PITCH_TO_KEY[v] = k});

export function playNote(pitch) {
  console.log('Play:', pitch)
  const key = PITCH_TO_KEY[pitch];

  if (!key) {
    return;
  }

  keyboard.type(key);
}

export const ROOT_MAP = {
  'C': 0,
  'C#': -1,
  'Db': -1,
  'D': -2,
  'D#': -3,
  'Eb': -3,
  'E': -4,
  'F': -5,
  'F#': -6,
  'Gb': -6,
  'G': -7,
  'G#': -8,
  'Ab': -8,
  'A': -9,
  'A#': -10,
  'Bb': -10,
  'B': -11,
}

export function normalizeNote(pitch, root = 'C') {
  console.log('Origin pitch', pitch)
  let newPitch = pitch;

  // 移调
  newPitch += ROOT_MAP[root] || 0;

  // 黑键转白键
  const whiteKeys = [0, 2, 4, 5, 7, 9, 11];
  
  if (!whiteKeys.includes(newPitch % 12)) {
    newPitch = newPitch - 1;
  }

  // 八度转换
  const pitches = Object.values(KEY_TO_PITCH);

  const step = newPitch < pitches[0] ? 8 : -8;

  while (!pitches.includes(newPitch)) {
    newPitch += step;
  }

  return newPitch;
}