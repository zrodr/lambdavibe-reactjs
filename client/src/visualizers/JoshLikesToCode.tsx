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
  p5.vertex(width/4 - groove, height/3 + groove);
  p5.vertex(width/2 + groove, height/3 + groove);
  p5.vertex(width/2 + groove, height*2/3 - groove);
  p5.vertex(width/4 - groove, height*2/3 - groove);
  p5.vertex(width/4 - groove, height/3 + groove);
  p5.ellipse(width/2 - groove, height/3 + groove, 50);
  p5.ellipse(width/4 - groove, height/3 + groove, 50);
  p5.ellipse(width/4 - groove, height - 100 + groove, 50);
  p5.ellipse(160 + width/4 - groove, height - 100 + groove, 50);
  p5.ellipse(80 + width/4 - groove, height - 250 + groove, 50);
  p5.ellipse(80 + width/4 - groove, height - 70 + groove, 50);
}

function visual2(p5: P5, width: number, height: number, groove: number)
{
   p5.ellipse(width/4 - groove, height/3 + groove, 10, 10);
   p5.ellipse(width/2 + groove, height/3 + groove, 10, 10);
   p5.ellipse(width/2 - groove, height/3 - groove, 10, 10);
}


export const  JoshLikesToCode = new Visualizer(
  'JoshLikesToCode',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerHeight;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);
    
    p5.background(randomColor(), randomColor(), 0, 255);

    p5.strokeWeight(dim * 0.001);
    // p5.stroke(255, 50, 255, 255);
    // p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape();
    // for(let a = 10; a < 360; a += 50)
    // {
      for (let i = 0; i < values.length; i++) {
        const amplitude = values[i] as number;
        // const x = (p5.map(i, 0, values.length - 1, 0, width)) + a  * Math.cos(a);
        // const y = ((height / 2 + amplitude * height) + a) * Math.sin(a);
        // Place vertex
        let groove = amplitude * height;
        p5.stroke(randomColor(), randomColor(), randomColor(), randomColor());
        visual1(p5, width, height, groove);
        // p5.ellipse(x, y, 10, 10);
        p5.strokeWeight(dim * 0.01);
        p5.stroke(randomColor(), randomColor(), randomColor(), randomColor());
        visual2(p5, width, height, groove);

      }
    // }
    p5.endShape();
  },
);