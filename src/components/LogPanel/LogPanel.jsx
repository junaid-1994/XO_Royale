import './LogPanel.css'

export default function LogPanel({ log })
{
    return (
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
    )
}
