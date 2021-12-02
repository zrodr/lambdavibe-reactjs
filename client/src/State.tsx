// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { wrattan_Instrument } from './instruments/wrattan';
import { WaveformVisualizer } from './visualizers/Waveform';
import { wrattan_Visualizer } from './visualizers/wrattan';

import { DrumInstrument } from './instruments/zrodr';
import { CircleVisualizer } from './visualizers/zrodr';

import { ColorfulVisualizer } from './visualizers/JoshLikesToCode';
import { Xylophone } from './instruments/JoshLikesToCode';

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */

/**
 * Observation: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument
 * 'visualizer': Visualizer
 */
export type AppState = Map<string, any>;

const instruments = List([PianoInstrument,wrattan_Instrument, DrumInstrument, Xylophone]);
const visualizers = List([WaveformVisualizer,wrattan_Visualizer, CircleVisualizer, ColorfulVisualizer]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
