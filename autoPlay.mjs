import { playNote } from './common.mjs';
import MidiPlayer from 'midi-player-js';
import { normalizeNote } from './common.mjs';

const config = {
  file: 'D:\\1.mid',
  root: 'C'
}

const player = new MidiPlayer.Player(ev => {
  if (ev.name === 'Note on') {
    let pitch = normalizeNote(ev.noteNumber, config.root);

    playNote(pitch);
  }
});


player.loadFile(config.file);
let delay = 3;

function d() {
  if (delay > 0) {
    delay--;
    console.log(delay);
    setTimeout(d, 1000);
  } else {
    player.play()
  }
}


setTimeout(d, 1000)