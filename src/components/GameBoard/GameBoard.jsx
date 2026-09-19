import './GameBoard.css';

function GameBoard(props)
{
    const { board, handleCellClick, winner } = props;

    return (
        <div className="board-wrapper">
          <div className="board" role="grid" aria-label="Tic Tac Toe board">
            {board.map((cell, index) => (
              <button
                key={index}
                type="button"
                className={`cell ${cell ? `filled-${cell.toLowerCase()}` : ''}`}
                onClick={() => handleCellClick(index)}
                disabled={Boolean(cell) || Boolean(winner)}
                aria-label={`Cell ${index + 1}`} >
                {cell}
              </button>
            ))}
          </div>
        </div>
    );
}

export default GameBoard;