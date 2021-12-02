// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import BackgroundImage from './../img/board.jpg'




/** ------------------------------------------------------------------------ **
 * Contains implementation of components for XYLOPHONE.
 ** ------------------------------------------------------------------------ */


interface XylophoneKeyProps {
  note: string;
  duration?: string;
  synth?: Tone.Synth;
  octave: number;
  index: number;
}

function size(index : number) : string | undefined {
    if(index === 1)
      return "90%";
    else if(index === 2)
      return "80%";
    else if(index === 3)
      return "70%";
    else if(index === 4)
      return "62.5%";
    else if(index === 5)
      return "55.5%";
    else if(index === 6)
      return "50%";
    return undefined;
}

export function XylophoneKey ({
  note,
  synth,
  index,
}: XylophoneKeyProps): JSX.Element {

  return (
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)}
      onMouseUp={() => synth?.triggerRelease('+0.25')}
      className={classNames('ba pointer absolute dim br-pill', {
        'bg-green h4': index === 1,
        'bg-red h4' : index === 2,
        'bg-pink h4' : index === 3,
        'bg-yellow h4': index === 4,
        'bg-orange h4' : index === 5,
        'bg-blue h4' : index === 6,
      })}
      style={{
        top: `${index * 1/3}rem`,
        bottom: `${index * 3}rem`,
        marginLeft: '1px',
        left: `${index * 2}rem`,
        height: `${size(index)}`,
        width: '2em',
        border: '1px solid black',
        color: 'white',
      }}
    ></div>
  );
}

function XylophoneType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

function Xylophone({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 1 },
    { note: 'Db', idx: 2 },
    { note: 'D', idx: 3 },
    { note: 'Eb', idx: 4 },
    { note: 'E', idx: 5 },
    { note: 'F', idx: 6 },
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };


  const oscillators: List<OscillatorType> = List([
    'square',
    'triangle',
    'fmsine',
  ]) as List<OscillatorType>;

  return (
    <div className={'p4 center'}>
      <div style= 
      {
        {
          margin: 'auto',
          width: '100%',
          paddingBottom: '28.28%',
          position: 'relative',
          overflow: 'hidden',
          flex: 'content',
          alignItems: 'center',
        }
      }
      >
        <div style=
        {
          {
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: '400px',
            backgroundAttachment: 'center',
            backgroundPosition: 'left',
            backgroundRepeat: 'no-repeat',
          }
        }>
          <div className="relative dib h4 w-100 ml4">
            {Range(2, 7).map(octave =>
              keys.map(key => {
                const note = `${key.note}${octave}`;
                return (
                  <XylophoneKey
                    key={note}
                    note={note}
                    synth={synth}
                    octave={octave}
                    duration={'8n'} // duration to prevent crashing
                    index={key.idx}
                  />
                );
              }),
            )}
          </div>
          </div>
        <div className='absolute dib h4 w-100 ml4'>
        <div className={'pl4 pt4 fixed flex'}>
          {oscillators.map(o => (
            <XylophoneType
              key={o}
              title={o}
              onClick={() => setOscillator(o)}
              active={synth?.oscillator.type === o}
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export const XylophoneInstru = new Instrument('JoshLikesToCode_Xylo', Xylophone);
