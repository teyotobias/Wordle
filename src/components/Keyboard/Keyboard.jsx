import './Keyboard.css';

export default function Keyboard({ onKeyPress }) {

    const keys = [
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'
    ];


    return (
        <div className="keyboard">
            {keys.map((key, index) => (
                <button key={index} className="key" onClick={() => onKeyPress(key)}>
                    {key}
                </button>
            ))}
        </div>
    );
};