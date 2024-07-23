import { useState, useEffect, useCallback } from 'react'

export default function useFetchWord() {
    const [word, setWord] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchWord = useCallback(async () => {
        setLoading(true);
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
    }, [])

    useEffect(() => {
        fetchWord();
    }, [fetchWord]);

    return { word, loading, error, refetch: fetchWord };
};