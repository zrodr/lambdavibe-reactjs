// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

function randomColor() : number
{
    let randomNum = Math.floor(Math.random() * (255 - 10 + 1)) + 1;
    return randomNum;
}

export const MarimbaVisualizer = new Visualizer(
  'MarimbaWaveform',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    const spectrum_width = 6;
    const values = analyzer.getValue();
    console.log(values.length);
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      let top_index = height/2 / spectrum_width;
      // const x_index = p5.map(i, 0, values.length - 1, 0, width/spectrum_width);
      const y_index = (amplitude * 2*height)/spectrum_width;
      for(let bar_height_index = 0; bar_height_index < y_index; bar_height_index++){
        const color = p5.map(bar_height_index, 0, top_index, 0, 200);
        p5.fill(color, 200 - color, 0, 255);
        p5.rect(i*spectrum_width, 2/3*height - bar_height_index*spectrum_width , spectrum_width, spectrum_width);
      }   
    }
  },
);
