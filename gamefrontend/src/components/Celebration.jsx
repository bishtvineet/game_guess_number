import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Celebration = ({ onPlayAgain }) => {
  return (
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
        onClick={onPlayAgain}
        className="play-again-btn"
      >
        Play Again
      </motion.button>
    </motion.div>
  );
};

Celebration.propTypes = {
  onPlayAgain: PropTypes.func.isRequired,
};

export default Celebration; 