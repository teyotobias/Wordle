
export const compareGuess = (guess, targetWord) => {
    const result = Array(5).fill('absent');
    const targetWordArr = targetWord.split();

    // first pass: check for correct letters
    guess.split('').forEach((letter,index) => {
        if(letter === targetWord[index]) {
            result[index] = 'correct';
            targetWordArr[index] = null;
        }
    });
    // second pass: check for present letteres
    guess.split('').forEach((letter,index) => {
        if(result[index] !== 'correct' && targetWord.includes(letter)) {
            result[index] = 'present';
            targetWordArr[targetWordArr.indexOf(letter)] = null;
        }
    })
    // third pass: ensure no incorrect duplicates are marked as present
    guess.split('').forEach((letter, index) => {
        if(result[index] === 'present') {
            const countInTarget = targetWord.split('').filter(l => l === letter).length;

            let correctCount = 0;
            let presentCount = 0;

            guess.split('').forEach((l, i) => {
                if (l === letter && result[i] === 'correct') correctCount++;
                if (l === letter && result[i] === 'present') presentCount++;
            });

            if (presentCount + correctCount > countInTarget) {
                result[index] = 'absent';
            }
        }
    })

    return result;
}


export const validateWord = async (word) => {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if(response.ok) {
            const data = await response.json();
            return data && data.length > 0;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};