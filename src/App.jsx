import { useState } from 'react'
import { DEFAULT_PLAYERS, WINNING_LINES } from './constants/Data.js'
import Header from './components/Header/Header.jsx'
import GameBoard from './components/GameBoard/GameBoard.jsx'
import WinnerModal from './components/WinnerModal/WinnerModal.jsx'
import PlayerPanel from './components/PlayerPanel/PlayerPanel.jsx'
import LogPanel from './components/LogPanel/LogPanel.jsx'
import AppDialog from  './components/AppDialog/AppDialog.jsx'
import './App.css'

function App() {
  const [players, setPlayers] = useState(DEFAULT_PLAYERS)
  const [board, setBoard] = useState(Array(9).fill(''))
  const [log, setLog] = useState([])

  const currentPlayer = board.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
  const winner = checkWinner(board);
  const statusText = winner ? 
      (winner.player ? `${players[winner.player]} wins!` : 'Draw game!')
    : `${players[currentPlayer]}'s turn`;
  const winnerName = winner ? players[winner.player] : '';

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

    const moveLabel = players[currentPlayer] + ` played in cell ${index + 1}`
    setLog((prev) => [...prev, moveLabel])
    
  }

  const resetGame = () => {
    setBoard(Array(9).fill(''))
    setLog([])
  }

  function checkWinner(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line }
    }
  }

  if (board.every(Boolean)) {
    return { player: null, line: null }
  }

  return null
}

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

export default App
