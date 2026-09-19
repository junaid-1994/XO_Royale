import {useState} from 'react';
import './PlayerPanel.css';

function PlayerPanel({players, handlePlayerNameChange})
{
      const [editMode, setEditMode] = useState(false);

        return(
         <section className="player-row">
            <label className="player-field">
                <span>Player X</span>
                <input
                type="text"
                value={players.X}
                onChange={(event) => handlePlayerNameChange('X', event.target.value)}
                disabled={!editMode}
                aria-label="Player X name"/>
            </label>

            <label className="player-field">
                <span>Player O</span>
                <input
                type="text"
                value={players.O}
                onChange={(event) => handlePlayerNameChange('O', event.target.value)}
                disabled={!editMode}
                aria-label="Player O name"/>
            </label>

            <button
                type="button"
                className="toggle-button"
                onClick={() => setEditMode((prev) => !prev)}>
                {editMode ? 'Save Names' : 'Edit Names'}
            </button>
        </section>
    );
}

export default PlayerPanel;

