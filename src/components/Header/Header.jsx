import './Header.css';

export default function Header()
{
    return (
        <header className="top-bar">
            <div className="brand" aria-label="Tic Tac Toe Royale brand">
                <div className="brand-mark">♛</div>
                <div>
                    <p className="eyebrow">ROYAL MATCH</p>
                    <h1>Tic Tac Toe Royale</h1>
                </div>
            </div>
        </header>
    );
}