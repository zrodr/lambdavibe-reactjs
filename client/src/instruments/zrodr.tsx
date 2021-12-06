import * as Tone from 'tone';
import { List } from 'immutable'
import { useEffect } from 'react';

import { Instrument, InstrumentProps } from '../Instruments';

import '../drumset.css'

interface DrumProps {
  note: string; // C, D, E, F, G, A, B
  duration?: string;
  synth?: Tone.Synth; // Synth for kick and tom sounds
  name: string;
}

function Drum({ synth, note, duration, name }: DrumProps) {
  return (
    <div 
      className={`drum-${name}`}
      onMouseDown={() => synth?.triggerAttackRelease(`${note}`, `${duration}`)}
    >
      {name}
    </div>
  )
}

const Drumset = ({ synth, setSynth }: InstrumentProps) => {
  const drums = List([
    { name: 'Snare', note: 'C1', duration: '8n' },
    { name: 'Tom1', note: 'D2', duration: '8n' },
    { name: 'Tom2', note: 'E1', duration: '8n' },
    { name: 'FloorTom', note: 'F2', duration: '8n' },
    { name: 'Bass', note: 'G1', duration: '8n' },
  ])

  useEffect(() => {
    (() => {
      setSynth(oldSynth => {
        oldSynth.dispose();
  
        return new Tone.MembraneSynth({
          oscillator: { type: 'square' } as Tone.OmniOscillatorOptions,
        }).toDestination();
      });
    })()
  }, [setSynth])

  return (
    <div className="center-container">
      <div className='container-grid'>
      {drums.map((drum) => {
        return (
          <Drum
            key={drum.name}
            note={drum.note}
            duration={drum.duration}
            synth={synth}
            name={drum.name}
          />
        )
      })}
      </div>
    </div>
  )
}

export const DrumInstrument = new Instrument('Drumset', Drumset)
