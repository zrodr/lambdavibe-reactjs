// 3rd party library imports
import classNames from 'classnames';
import { List } from 'immutable';
import React from 'react';
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  RadioButton20,
  RadioButtonChecked20,
  Music20,
} from '@carbon/icons-react';

// project imports
import { DispatchAction } from './Reducer';
import { AppState } from './State';
import { send } from './Socket'
import { Instrument } from './Instruments';
import { Visualizer } from './Visualizers';


/** ------------------------------------------------------------------------ **
 * All the components in the side navigation.
 ** ------------------------------------------------------------------------ */

interface SideNavProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
}

const Section: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="flex flex-column h-25 bb b--light-gray pa3">
      <div className="fw7 mb2">{title} </div>
      <div className="flex-auto overflow-scroll">{children}</div>
    </div>
  );
};

interface RadioButtonProps {
  to: any,
  text: string,
  active: boolean,
  onClick: () => void
}

function RadioButton({ to, text, active, onClick }: RadioButtonProps): JSX.Element {
  return (
    <Link to={to} className="no-underline">
      <div
        className={classNames('f6 flex items-center black', { fw7: active })}
        onClick={onClick}
      >
        {active ? (
          <RadioButtonChecked20 className="mr1" />
        ) : (
          <RadioButton20 className="mr1" />
        )}
        <div className="dim">{text}</div>
      </div>
    </Link>
  );
}

function Instruments({ state }: SideNavProps): JSX.Element {
  const instruments: List<Instrument> = state.get('instruments');
  const activeInstrument = state.get('instrument')?.name;
  const location = useLocation();

  return (
    <Section title="Instruments">
      {instruments.map(i => (
        <RadioButton
          key={i.name}
          to={`/${i.name}${location.search}`}
          text={i.name}
          active={i.name === activeInstrument}
          onClick={() => console.log(i.name)}
        />
      ))}
    </Section>
  );
}

function Visualizers({ state }: SideNavProps): JSX.Element {
  const visualizers: List<Visualizer> = state.get('visualizers');
  const activeVisualizer = state.get('visualizer')?.name;
  const location = useLocation();

  return (
    <Section title="Visualizers">
      {visualizers.map(v => (
        <RadioButton
          key={v.name}
          to={{
            pathname: location.pathname,
            search: `?visualizer=${v.name}`,
          }}
          text={v.name}
          active={v.name === activeVisualizer}
          onClick={() => console.log(v.name)}
        />
      ))}
    </Section>
  );
}

function SearchBar({ state, dispatch }: SideNavProps): JSX.Element {
  const BarStyling = { width: "100%", background: "#F2F1F9", border: "none", padding: "0.5rem" };
  const [query, setQuery] = useState('')

  async function search (query: string) {
    if (query === '') {
      const { songs } = await send(state.get('socket'), 'get_songs', {});
      dispatch(new DispatchAction('SET_SONGS', { songs }));
    }
    else {
      const { songs } = await send(state.get('socket'), 'search_songs', { query });
      dispatch(new DispatchAction('SET_SONGS', { songs }));
    }
  }

  return (
    <div>
      <input
        id={'search-bar'}
        style={BarStyling}
        placeholder={"Search"}
        onChange={(e) => {
          e.preventDefault()
          setQuery(e.target.value)
          search(query)
        }}
      />
    </div>
  );
}

function Songs({ state, dispatch }: SideNavProps): JSX.Element {
  const songs: List<any> = state.get('songs', List());
  return (
    <>
      <SearchBar state={state} dispatch={dispatch} />
      <Section title="Playlist">
        {songs.map(song => (
          <div
            key={song.get('id')}
            className="f6 pointer underline flex items-center no-underline i dim"
            onClick={() =>
              dispatch(new DispatchAction('PLAY_SONG', { id: song.get('id') }))
            }
          >
            <Music20 className="mr1" />
            {song.get('songTitle')}
          </div>
        ))}
      </Section>
    </>
  )
}

export function SideNav({ state, dispatch }: SideNavProps): JSX.Element {
  return (
    <div className="absolute top-0 left-0 bottom-0 w5 z-1 shadow-1 bg-white flex flex-column">
      <div className="h3 fw7 f5 flex items-center pl3 bb b--light-gray">
        Nameless App
      </div>
      <div className="flex-auto">
        <Instruments state={state} dispatch={dispatch} />
        <Visualizers state={state} dispatch={dispatch} />
        <Songs state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}
