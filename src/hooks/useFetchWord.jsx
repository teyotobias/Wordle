import { useState, useEffect } from 'react'

export default function useFetchWord() {
    const [word, setWord] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchWord = async () => {
            try {
                const response = await fetch('/fiveLetterWords.json');
                const data = await response.json()
                const randomWord = data[Math.floor(Math.random() * data.length)].toUpperCase();
                setWord(randomWord)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        };

        fetchWord();
    }, [])

    return { word, loading, error }
};