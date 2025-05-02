import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import './App.css';

function App() {
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
      if(maxNumber - minNumber < 20){
        setError('Guess range must be at least 20');
        return;
      }

      const response = await axios.post('http://localhost:8000/game/start', {
        min_number: parseInt(minNumber),
        max_number: parseInt(maxNumber)
      });
      setGameStarted(true);
      setMessage('Game started! Make your first guess.');
      setError('');
      setGuess('');
      setGuessChanges(7);
      setGameWon(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error starting game');
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

  const makeGuess = async (e) => {
    e.preventDefault();
    try {
      if(guessChanges <= 0){
        setError('You have no more guesses left');
        return;
      }
      
      const response = await axios.post('http://localhost:8000/game/guess', {
        guess: parseInt(guess)
      });
      
      setGuessChanges((prev)=> prev - 1);
      setMessage(response.data.message);
      
      if (response.data.result === 'correct') {
        setGameWon(true);
        setMessage('Congratulations! You have guessed the number!');
      }
      setError('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error making guess');
    }
  };

  return (
    <div className="App">
      {gameWon ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="celebration-container"
        >
          <motion.div 
            className="confetti"
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: [null, 0, -50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            🎈🎉✨
          </motion.div>
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="celebration-text"
          >
            Congratulations!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="celebration-subtext"
          >
            You've won the game!
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={resetGame}
            className="play-again-btn"
          >
            Play Again
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container"
        >
          <h1>Number Guessing Game</h1>
          
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="error-message"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {!gameStarted || guessChanges <= 0 ? (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onSubmit={startGame}
              className="game-form"
            >
              {guessChanges <= 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="message"
                >
                  Game Over! No more guesses left.
                </motion.div>
              )}
              <div className="input-group">
                <label>First Number:</label>
                <input
                  type="number"
                  value={minNumber}
                  onChange={(e) => setMinNumber(e.target.value)}
                  required
                  min={0}
                />
              </div>
              <div className="input-group">
                <label>Second Number:</label>
                <input
                  type="number"
                  value={maxNumber}
                  onChange={(e) => setMaxNumber(e.target.value)}
                  required
                  max={100}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
              >
                {guessChanges <= 0 ? 'Play Again' : 'Start Game'}
              </motion.button>
            </motion.form>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onSubmit={makeGuess}
              className="game-form"
            >
              <h1>You have {guessChanges} guesses left</h1>
              <div className="input-group">
                <label>Your Guess:</label>
                <input
                  type="number"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
              >
                Submit Guess
              </motion.button>
            </motion.form>
          )}

          <AnimatePresence>
            {message && !gameWon && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="message"
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export default App
