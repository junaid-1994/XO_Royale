import './WinnerModal.css'

export default function WinnerModal({winner, winnerName, resetGame})
{
    return(
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
    );
}