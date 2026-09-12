import { useMemo, useState } from 'react'
import './App.css'

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const DEFAULT_PLAYERS = {
  X: 'Player X',
  O: 'Player O',
}

function App() {
  const [players, setPlayers] = useState(DEFAULT_PLAYERS)
  const [editMode, setEditMode] = useState(false)
  const [board, setBoard] = useState(Array(9).fill(''))
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [winner, setWinner] = useState(null)
  const [log, setLog] = useState([])

  const winnerName = useMemo(() => {
    if (!winner) return ''
    return players[winner.player]
  }, [players, winner])

  const handlePlayerNameChange = (symbol, value) => {
    setPlayers((prev) => ({
      ...prev,
      [symbol]: value || (symbol === 'X' ? 'Player X' : 'Player O'),
    }))
  }

  const handleCellClick = (index) => {
    if (board[index] || winner) return

    const nextBoard = [...board]
    nextBoard[index] = currentPlayer
    setBoard(nextBoard)

    const moveLabel = `${indexToPosition(index)} -- ${players[currentPlayer]}`
    setLog((prev) => [...prev, `${players[currentPlayer]} played ${moveLabel}`])

    const result = checkWinner(nextBoard)

    if (result) {
      setWinner(result)
      return
    }

    if (nextBoard.every(Boolean)) {
      setWinner({ player: null, line: null })
      return
    }

    setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'))
  }

  const resetGame = () => {
    setBoard(Array(9).fill(''))
    setCurrentPlayer('X')
    setWinner(null)
    setLog([])
  }

  const statusText = winner
    ? winner.player
      ? `${players[winner.player]} wins!`
      : 'Draw game!'
    : `${players[currentPlayer]}'s turn`

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="brand" aria-label="Tic Tac Toe Royale brand">
          <div className="brand-mark">♛</div>
          <div>
            <p className="eyebrow">ROYAL MATCH</p>
            <h1>Tic Tac Toe Royale</h1>
          </div>
        </div>
      </header>

      <main className="game-panel">
        <section className="player-row">
          <label className="player-field">
            <span>Player X</span>
            <input
              type="text"
              value={players.X}
              onChange={(event) => handlePlayerNameChange('X', event.target.value)}
              disabled={!editMode}
              aria-label="Player X name"
            />
          </label>

          <label className="player-field">
            <span>Player O</span>
            <input
              type="text"
              value={players.O}
              onChange={(event) => handlePlayerNameChange('O', event.target.value)}
              disabled={!editMode}
              aria-label="Player O name"
            />
          </label>

          <button
            type="button"
            className="toggle-button"
            onClick={() => setEditMode((prev) => !prev)}
          >
            {editMode ? 'Save Names' : 'Edit Names'}
          </button>
        </section>

        <div className="status-bar">
          <span className="status-label">Current Player</span>
          <strong>{statusText}</strong>
        </div>

        <div className="board-wrapper">
          <div className="board" role="grid" aria-label="Tic Tac Toe board">
            {board.map((cell, index) => (
              <button
                key={index}
                type="button"
                className={`cell ${cell ? `filled-${cell.toLowerCase()}` : ''}`}
                onClick={() => handleCellClick(index)}
                disabled={Boolean(cell) || Boolean(winner)}
                aria-label={`Cell ${index + 1}`}
              >
                {cell}
              </button>
            ))}
          </div>
        </div>

        <section className="log-panel" aria-live="polite">
          <div className="log-header">
            <h2>Match Log</h2>
          </div>

          <ul className="log-list">
            {log.length === 0 ? (
              <li className="log-empty">No moves yet. The battle begins now.</li>
            ) : (
              log.map((entry, index) => <li key={`${entry}-${index}`}>{entry}</li>)
            )}
          </ul>
        </section>
      </main>

      {winner && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="winner-modal">
            <div className="modal-badge">🏆</div>
            <h3>{winner.player ? `${winnerName} wins!` : 'Draw game!'}</h3>
            <p>
              {winner.player
                ? `${winnerName} claimed the crown in a brilliant finish.`
                : 'The board is full and the match ends in a stalemate.'}
            </p>
            <button type="button" className="rematch-button" onClick={resetGame}>
              Rematch
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function indexToPosition(index) {
  const labels = [
    'Top Left',
    'Top Center',
    'Top Right',
    'Middle Left',
    'Center',
    'Middle Right',
    'Bottom Left',
    'Bottom Center',
    'Bottom Right',
  ]

  return labels[index] || `Cell ${index + 1}`
}

function checkWinner(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line }
    }
  }

  return null
}

export default App
