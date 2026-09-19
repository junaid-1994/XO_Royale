import { useMemo, useState } from 'react'
import './App.css'
import Header from './components/Header/Header.jsx'
import GameBoard from './components/GameBoard/GameBoard.jsx'
import WinnerModal from './components/WinnerModal/WinnerModal.jsx'
import PlayerPanel from './components/PlayerPanel/PlayerPanel.jsx'
import LogPanel from './components/LogPanel/LogPanel.jsx'
import AppDialog from  './components/AppDialog/AppDialog.jsx'

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
      [symbol]: value || (symbol === 'X' ? DEFAULT_PLAYERS.X : DEFAULT_PLAYERS.O),
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
      
      <Header/>

      <main className="game-panel">
       
        <PlayerPanel players={players} handlePlayerNameChange={handlePlayerNameChange} />

        <div className="status-bar">
          <span className="status-label">Current Player</span>
          <strong>{statusText}</strong>
        </div>

        <GameBoard board={board} handleCellClick={handleCellClick} winner={winner} />

        <LogPanel log={log} />

      </main>

      {winner && (
        <AppDialog>
          <WinnerModal winner={winner} winnerName={winnerName} resetGame={resetGame} />
        </AppDialog>
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
