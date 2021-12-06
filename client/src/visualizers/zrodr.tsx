import P5 from 'p5';
import * as Tone from 'tone';

import { Visualizer } from '../Visualizers';

export const CircleVisualizer: Visualizer = new Visualizer(
  'Circle',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    p5.background('#01274c');
    p5.noFill();
    p5.stroke(255, 255, 255, 255);
    p5.strokeWeight(5);
    p5.translate(width / 2 - (width / 12), height / 2)
    p5.scale(0.66)
    
    p5.angleMode(p5.DEGREES)

    const values = analyzer.getValue()

    p5.beginShape()
    for (let i = 0; i <= 180; i++) {
      let idx = p5.floor(p5.map(i, 0, 180, 0, values.length - 1))
      let radius = p5.map(values[idx] as number, -1, 1, 150, 350)

      const x = radius * p5.sin(i)
      const y = radius * p5.cos(i)

      p5.vertex(x, y)
    }
    p5.endShape()
    p5.beginShape()
    for (let i = 0; i <= 180; i++) {
      let idx = p5.floor(p5.map(i, 0, 180, 0, values.length - 1))
      let radius = p5.map(values[idx] as number, -1, 1, 150, 350)

      const x = radius * p5.sin(i) * -1
      const y = radius * p5.cos(i)

      p5.vertex(x, y);
    }
    p5.endShape();

  }
)