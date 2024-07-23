import useFetchWord from '../../hooks/useFetchWord';
import { useState } from 'react';
import './Grid.css';
import Tile from '../Tile/Tile.jsx';
import Keyboard from '../Keyboard/Keyboard.jsx';
import { validateWord, compareGuess } from '../../utils/wordleUtils.js';


export default function Grid() {
    const { word, loading, error, refetch } = useFetchWord(); // word to be guessed
    const [currentGuess, setCurrentGuess] = useState(''); // to hold user's current guess
    const [guesses, setGuesses] = useState(Array(6).fill('')) // to hold all of user's guesses
    const [guessResults, setGuessResults] = useState(Array(6).fill(null)) // to hold absent / present / correct status of each tile
    const [gameStatus, setGameStatus] = useState('playing'); // to hold current game status
    const [keyStatus, setKeyStatus] = useState({}); // used to check whether a key has been used or not

    const handleKeyPress = async (key) => {
        if (gameStatus !== 'playing') return;
        
        if(key === 'Enter') {
            if (currentGuess.length === 5) {
                const isValidWord = await validateWord(currentGuess.toLowerCase());
                if(!isValidWord) {
                    alert('Invalid word');
                    return;
                }
                const newGuesses = [...guesses];
                const newResults = [...guessResults];
                const emptyIndex = newGuesses.findIndex(guess => guess === '');

                if (emptyIndex !== -1) {
                    newGuesses[emptyIndex] = currentGuess;
                    newResults[emptyIndex] = compareGuess(currentGuess, word);
                    
                    setGuesses(newGuesses);
                    setGuessResults(newResults);

                    // check for win
                    if(currentGuess === word) {
                        setGameStatus('won');
                        setTimeout(() => alert('Congratulations! You guessed the word'), 100); // Delay to allow state update
                        return;
                    }

                    if(emptyIndex === guesses.length  - 1) {
                        setGameStatus('lost');
                        setTimeout(() => alert(`Game over! The word was ${word}`), 100); // Delay to allow state update
                        return;
                    }


                    // Update key status
                    const newKeyStatus = { ...keyStatus};
                    currentGuess.split('').forEach((letter, index) => {
                        if(!newKeyStatus[letter] || newKeyStatus[letter] !== 'correct') {
                            newKeyStatus[letter] = newResults[emptyIndex][index];
                        }
                    });
                    setKeyStatus(newKeyStatus);

                    setCurrentGuess('');
                }

            }
        } else if(key === 'Backspace') {
            setCurrentGuess(currentGuess.slice(0,-1))
        } else if(currentGuess.length < 5 && /^[a-zA-Z]$/.test(key)) {
            setCurrentGuess(currentGuess + key)
        }
    };

    const resetGame = () => {
        setCurrentGuess('');
        setGuesses(Array(6).fill(''));
        setGuessResults(Array(6).fill(null));
        setKeyStatus({});
        setGameStatus('playing');
        refetch();
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const currentRow = guesses.findIndex(guess => guess === '');
    
    return (
        <div className="game">
            <header>
                <h1 class="title">WORDLE</h1>
            </header>
            <div className="gridContainer">
                <div className="grid">
                    {guesses.map((guess, rowIndex) => (
                        <div key={rowIndex} className="row">
                            {Array(5).fill('').map((_, tileIndex) => (
                                <Tile 
                                    key={tileIndex} 
                                    letter={rowIndex === currentRow && gameStatus === 'playing' ? (currentGuess[tileIndex] || ''): guess[tileIndex] || ''}
                                    state = {rowIndex !== currentRow && guessResults[rowIndex] ? guessResults[rowIndex][tileIndex]: ''}
                                />

                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <Keyboard onKeyPress={handleKeyPress} keyStatus={keyStatus} />
            <button onClick={resetGame} className="new-game-button">New Game</button>
            <p>Word of the day: {word}</p>
        </div>
    )
}