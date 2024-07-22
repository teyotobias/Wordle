import useFetchWord from '../../hooks/useFetchWord';
import { useState } from 'react';
import './Grid.css';
import Tile from '../Tile/Tile.jsx';
import Keyboard from '../Keyboard/Keyboard.jsx';


export default function Grid() {
    const { word, loading, error } = useFetchWord();
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState(Array(6).fill(''))

    const handleKeyPress = (key) => {
        if(key === 'Enter') {

            if (currentGuess.length === 5) {
                const newGuesses = [...guesses];
                const emptyIndex = newGuesses.findIndex(guess => guess === '');
                if (emptyIndex !== -1) {
                    newGuesses[emptyIndex] = currentGuess
                    setGuesses(newGuesses)
                    setCurrentGuess('')
                }
            }
        } else if(key === 'Backspace') {
            setCurrentGuess(currentGuess.slice(0,-1))
        } else if(currentGuess.length < 5) {
            setCurrentGuess(currentGuess + key)
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    
    return (
        <div className="game">
            <div className="grid">
                {guesses.map((guess, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {Array(5).fill('').map((_, tileIndex) => (
                            <Tile key={tileIndex} letter={guess[tileIndex] || ''} />

                        ))}
                    </div>
                ))}
            </div>
            <Keyboard onKeyPress={handleKeyPress} />
            <p>Word of the day: {word}</p>
        </div>
    )
}