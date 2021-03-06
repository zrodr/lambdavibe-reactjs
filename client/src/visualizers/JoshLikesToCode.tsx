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

function visual1(p5: P5, width: number, height: number, groove: number)
{
  p5.vertex(width - groove, height/3 + groove);
  p5.vertex(width + groove, height/3 + groove);
  p5.vertex(width + groove, height*2/3 - groove);
  p5.vertex(width - groove, height*2/3 - groove);
  p5.vertex(width - groove, height/3 + groove);
  p5.ellipse(width - groove - 100, height/3 + groove + 50, 50);
  p5.ellipse(100 + width - groove, height/3 + groove + 50, 50);
  p5.ellipse(width - groove, height - 265 + groove, 50);
  p5.ellipse(width - groove, height - 70 + groove, 50);
}

function visual2(p5: P5, width: number, height: number, groove: number)
{
   p5.ellipse(width - groove, height/3 + groove + 50, 10, 10);
   p5.ellipse(width + groove, height/3 + groove, 10, 10);
   p5.ellipse(width - groove, height/3 - groove + 100, 10, 10);
}


export const ColorfulVisualizer = new Visualizer(
  'ColorfulVisualizer',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerHeight;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);
    
    p5.background(randomColor(), randomColor(), 0, 255);

    p5.strokeWeight(dim * 0.001);

    const values = analyzer.getValue();
    p5.beginShape();

      for (let i = 0; i < values.length; i++) {
        const amplitude = values[i] as number;

        let groove = amplitude * height;
        p5.stroke(randomColor(), randomColor(), randomColor(), randomColor());
        visual1(p5, width, height, groove);
        p5.strokeWeight(dim * 0.01);
        p5.stroke(randomColor(), randomColor(), randomColor(), randomColor());
        visual2(p5, width, height, groove);

      }
 
    p5.endShape();
  },
);