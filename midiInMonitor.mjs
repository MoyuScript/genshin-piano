

import midi from 'midi';
import { playNote } from './common.mjs';

const input = new midi.Input();

input.on('message', (time, msg) => {
  const isNoteOn = (msg[0] >>> 4) === 0x9
  const pitch = msg[1];
  
  if (isNoteOn) {
    console.log('Send pitch:', pitch)
    playNote(pitch)
  }
});

input.openPort(0);