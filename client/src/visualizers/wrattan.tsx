// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const wrattan_Visualizer = new Visualizer(
  'wrattan',
  (p5: P5, analyzer: Tone.Analyser) => {

    const width1 = window.innerWidth;
    const height1 = window.innerHeight / 2;
    const dim = Math.min(width1, height1);

    p5.background(0, 0, 0, 255);

    //W Shape start
    p5.strokeWeight(dim * 0.05);
    p5.stroke(255, 0, 255, 255);

    const values = analyzer.getValue();
    

    p5.beginShape();
    p5.noFill();
   
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      let X = p5.map(amplitude,0,1,2,300)
      p5.vertex(window.innerWidth/10+X, window.innerHeight/10);
      p5.vertex(window.innerWidth/8,window.innerHeight/2)
      
      
    }
    p5.endShape();

    p5.beginShape();
    
    p5.vertex(window.innerWidth/8,window.innerHeight/2)
    p5.vertex(window.innerWidth/7,window.innerHeight/10)

    p5.endShape();

    p5.beginShape();

    p5.vertex(window.innerWidth/6,window.innerHeight/2)
    p5.vertex(window.innerWidth/7,window.innerHeight/10)

    p5.endShape();

    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      let X2 = p5.map(amplitude,0,1,2,300)
    p5.vertex(window.innerWidth/6+X2,window.innerHeight/2)
    p5.vertex(window.innerWidth/5.4,window.innerHeight/10)
    }
    p5.endShape();
    //W Shape end

    //I Shape start

    p5.beginShape();
    p5.strokeWeight(dim * 0.05);
    for (let i = 0; i < values.length; i++) {
    const amplitude = values[i] as number;
    let X3 = p5.map(amplitude,0,1,2,350)
    p5.stroke(255,255,0,255)
    
    p5.vertex(window.innerWidth/4,window.innerHeight/2)
    p5.vertex(window.innerWidth/4 + X3,window.innerHeight/10)
    
    }
    p5.endShape();
    //I shape end


    //First L shape start

  
    p5.stroke(0,255,255,255)
    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
    const amplitude = values[i] as number;
    let X4 = p5.map(amplitude,0,1,2,300)
    p5.vertex(window.innerWidth/3 +X4,window.innerHeight/2);
    p5.vertex(window.innerWidth/3,window.innerHeight/10)

    }
    p5.endShape();


    p5.beginShape();
    
    
    
    p5.vertex(window.innerWidth/3,window.innerHeight/2.05);
    p5.vertex(window.innerWidth/2.4,window.innerHeight/2.05)
    
    p5.endShape();
    //First L shape end

    //Second L shape start


    
    p5.stroke(255,0,0,255)
    p5.beginShape();
    
    p5.vertex(window.innerWidth/2.1,window.innerHeight/2);
    p5.vertex(window.innerWidth/2.1,window.innerHeight/10)

    p5.endShape();

    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
    const amplitude = values[i] as number;
    let X5 = p5.map(amplitude,0,1,2,280)
    p5.vertex(window.innerWidth/2.1,window.innerHeight/2);
    p5.vertex(window.innerWidth/1.9+X5,window.innerHeight/3)
    }
    p5.endShape();
    //Second L shape end

    
   
    
  },
  
);