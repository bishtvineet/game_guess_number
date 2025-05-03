import { useState } from 'react';
import { startGame as apiStartGame, makeGuess as apiMakeGuess } from '../services/api';

const useGame = () => {
  const [minNumber, setMinNumber] = useState('');
  const [maxNumber, setMaxNumber] = useState('');
  const [guess, setGuess] = useState('');
  const [guessChanges, setGuessChanges] = useState(7);
  const [message, setMessage] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [error, setError] = useState('');
  const [gameWon, setGameWon] = useState(false);

  const startGame = async (e) => {
    e.preventDefault();
    try {
      if (maxNumber - minNumber < 20) {
        setError('Guess range must be at least 20');
        return;
      }

      await apiStartGame(minNumber, maxNumber);
      setGameStarted(true);
      setMessage('Game started! Make your first guess.');
      setError('');
      setGuess('');
      setGuessChanges(7);
      setGameWon(false);
    } catch (err) {
      setError(err);
    }
  };

  const makeGuess = async (e) => {
    e.preventDefault();
    try {
      if (guessChanges <= 0) {
        setError('You have no more guesses left');
        return;
      }
      
      const response = await apiMakeGuess(guess);
      setGuessChanges((prev) => prev - 1);
      setMessage(response.message);
      
      if (response.result === 'correct') {
        setGameWon(true);
        setMessage('Congratulations! You have guessed the number!');
      }
      setError('');
    } catch (err) {
      setError(err);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setMinNumber('');
    setMaxNumber('');
    setGuess('');
    setGuessChanges(7);
    setMessage('');
    setError('');
    setGameWon(false);
  };

  return {
    minNumber,
    setMinNumber,
    maxNumber,
    setMaxNumber,
    guess,
    setGuess,
    guessChanges,
    message,
    gameStarted,
    error,
    gameWon,
    startGame,
    makeGuess,
    resetGame,
  };
};

export default useGame; 