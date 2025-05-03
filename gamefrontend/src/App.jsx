import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import useGame from './hooks/useGame';
import GameForm from './components/GameForm';
import GameInput from './components/GameInput';
import GameMessage from './components/GameMessage';
import Celebration from './components/Celebration';

function App() {
  const {
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
  } = useGame();

  return (
    <div className="App">
      {gameWon ? (
        <Celebration onPlayAgain={resetGame} />
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
              <GameMessage message={error} type="error" />
            )}
          </AnimatePresence>

          {!gameStarted || guessChanges <= 0 ? (
            <GameForm onSubmit={startGame} buttonText={guessChanges <= 0 ? 'Play Again' : 'Start Game'}>
              {guessChanges <= 0 && (
                <GameMessage message="Game Over! No more guesses left." type="error" />
              )}
              <GameInput
                label="First Number:"
                value={minNumber}
                onChange={(e) => setMinNumber(e.target.value)}
                min={0}
              />
              <GameInput
                label="Second Number:"
                value={maxNumber}
                onChange={(e) => setMaxNumber(e.target.value)}
                max={100}
              />
            </GameForm>
          ) : (
            <GameForm onSubmit={makeGuess} buttonText="Submit Guess">
              <h1>You have {guessChanges} guesses left</h1>
              <GameInput
                label="Your Guess:"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
              />
            </GameForm>
          )}

          <AnimatePresence>
            {message && !gameWon && (
              <GameMessage message={message} type="info" />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export default App;
