import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const GameForm = ({ onSubmit, buttonText, children }) => {
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      onSubmit={onSubmit}
      className="game-form"
    >
      {children}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
      >
        {buttonText}
      </motion.button>
    </motion.form>
  );
};

GameForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default GameForm; 