import './Keyboard.css';

export default function Keyboard({ onKeyPress, keyStatus }) {

    const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const row3 = ['Backspace', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Enter'];


    return (
        <div className="keyboard">
            <div className="keyboard-row">
                {row1.map((key, index) => (
                    <button 
                        key={index} 
                        className={`key ${keyStatus[key]}`} 
                        onClick={() => onKeyPress(key)}
                    >
                        {key}
                    </button>
                ))}
            </div>
            <div className="keyboard-row">
            <div class="spacer-half"></div>
                {row2.map((key, index) => (
                    <button 
                        key={index} 
                        className={`key ${keyStatus[key]}`} 
                        onClick={() => onKeyPress(key)}
                    >
                        {key}
                    </button>
                ))}
                <div class="spacer-half"></div>
            </div>
            <div className="keyboard-row">
                {row3.map((key, index) => (
                    <button 
                        key={index} 
                        className={`key ${key === 'Enter' || key === 'Backspace' ? 'wide-button' : ''} ${keyStatus[key]}`}
                        onClick={() => onKeyPress(key)}
                    >
                        {key}
                    </button>
                ))}
            </div>
        </div>
    );
};