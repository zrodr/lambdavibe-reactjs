// 3rd party library imports
import * as Tone from 'tone';
// eslint-disable-next-line
import classNames from 'classnames';
// eslint-disable-next-line
import { List, Range } from 'immutable';
// eslint-disable-next-line
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

//css 

let screenHeight = window.screen.height;
let screenWidth = window.screen.width;
let buttonWidth = screenWidth/4
let buttonHeight = screenHeight/15

const COLORS = {
  white: '#fff',
  black: '#000',
  LightBlue: '#01B7ED',
  AppleGreen: '#00D651',
  BrightRed: '#F5004E',
  peachColor: '#FF9360'
}

const OscillatorButton ={
  backgroundColor: COLORS.peachColor,
  fontFamily:"Arial",
  fontSize: "24px",
}

const OscillatorPosition ={
  display: 'flex',
  justifyContent:'center',
  alignItems:'center',

}

const fontStyle ={
  fontSize:"40px",
  fontFamily:"Cochin"
}

const bodyStyle ={
   backgroundColor: COLORS.LightBlue,
   height: '100vh'
}
const headerStyle={
  display: 'flex',
  alignItems:'center',
  fontFamily: "Arial",
  justifyContent:'center',
}

const alignhelper1={
  display: 'flex',
  justifyContent:'center',
  alignItems:'center',
}

const TrumpetImg ={
  display: 'flex',
  justifyContent:'center',
  alignItems:'center',
}

const ResizeImg ={
    width: window.innerWidth/2,
    height: window.innerHeight/3.5,
    resizeMode: 'contain'
}

const toh = {
  color: "black",
  height: buttonHeight,
  width: buttonWidth,
  backgroundColor: COLORS.BrightRed,
  justifyContent:'center',
  alignItems:'center',
};

const tee = {
  color: "black",
  height: buttonHeight,
  width: buttonWidth,
  backgroundColor: COLORS.AppleGreen,
  justifyContent:'center',
  alignItems:'center',
 
};

//Keyboard input handlers 

  let valve1 = false;
  let valve2 = false;
  let valve3 = false;
  document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; 
    }
    switch (event.key) {
      case "1":
        valve1 = true;
        break;
      case "2":
        valve2 = true;
        break;
      case "3":
          valve3 = true;
          break;
      default:
        return; 
    }
  
   
    event.preventDefault();
  }, true);

  document.addEventListener("keyup", function (event) {
    if (event.defaultPrevented) {
      return; 
    }
    switch (event.key) {
      case "1":
          valve1 = false;
          break;
      case "2":
          valve2 = false;
        break;
      case "3":
          valve3 = false;
          break;
      default:
        return; 
    }
  
    event.preventDefault();
  }, true);
  
function wrattan({ synth, setSynth }: InstrumentProps): JSX.Element {




  const setOscillator = () => {
    setSynth(oldSynth => {
      oldSynth.dispose();
      return new Tone.Synth({
        oscillator: { type: "amsawtooth5" } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };
  
const TeeSynth = new Tone.AMSynth({
    volume: -5,
    harmonicity: 2,
  }).toDestination();

const TohSynth = new Tone.DuoSynth({
    volume : -20,
    harmonicity : 0.5 ,
}).toDestination();


function playTohNote(note: string) {
    TohSynth.triggerAttackRelease(`${note}4`, "8n");
  }

function playTeeNote(note: string){
  TeeSynth.triggerAttackRelease(`${note}4`, "8n");
}

  return (
    <>
    <body style = {bodyStyle}>
    
    <div><h2 style ={headerStyle}> ♫ ♫ 🎺 Press 1,2,3 or any combination to change notes 🎺 ♫ ♫ </h2></div><>
    
    
      <div style = {alignhelper1}>
      <button className="OpenMouth" style={toh}
        onClick={() => {

          //first valve only
          if (valve1 === true && valve2 === false && valve3 === false) {
            playTohNote('E');
          }
          //second valve only
          if (valve2 === true && valve1 === false && valve3 === false) {
            playTohNote('C');
            //no valves
          } if (valve2 === false && valve1 === false && valve3 === false) {
            playTohNote('C#');
            //first and second
          } if (valve1 === true && valve2 === true && valve3 === false) {
            playTohNote('D');
          } //first and third
          if (valve1 === true && valve2 === false && valve3 === true) {
            playTohNote('G');
          }
          //second and third
          if (valve1 === false && valve2 === true && valve3 === true) {
            playTohNote('Eb');
          }
          //all valves
          if (valve1 === true && valve2 === true && valve3 === true) {
            playTohNote('F');
          }
        } }>
        <div style ={fontStyle}>  
        🎶🎶 toh 🎶🎶
        </div>
      </button>
     
      <button className="CloseMouth" style={tee}
        onClick={() => {
          //first valve only
          if (valve1 === true && valve2 === false && valve3 === false) {
            playTeeNote('F');
          }
          //second valve only
          if (valve2 === true && valve1 === false && valve3 === false) {
            playTeeNote('B');
            //no valves
          } if (valve2 === false && valve1 === false && valve3 === false) {
            playTeeNote('G');
            //first and second
          } if (valve1 === true && valve2 === true && valve3 === false) {
            playTeeNote('A');
          } //first and third
          if (valve1 === true && valve2 === false && valve3 === true) {
            playTeeNote('D');
          }
          //second and third
          if (valve1 === false && valve2 === true && valve3 === true) {
            playTeeNote('Ab');
          }
          //all valves
          if (valve1 === true && valve2 === true && valve3 === true) {
            playTeeNote('E');
          }
        } }>
        <div style ={fontStyle}> 
        🎵🎵 tee 🎵🎵
        </div>
      </button>

</div>


<div style ={OscillatorPosition}>
  <button className ="setOsillator" style = {OscillatorButton}
  onClick= {()=> setOscillator()
  }>
 ♪ Set as Current Instrument ♪
  </button>
</div>
      <div style={TrumpetImg}>
        <img style = {ResizeImg} src="https://cdn.jpmusicalinstruments.com/uploads/var/14_60_s.png?v=1516632152" alt = "Synth Trumpet"></img>
      </div>
      </>
      </body></>
    );
  }
export const wrattan_Instrument = new Instrument('wrattan', wrattan);