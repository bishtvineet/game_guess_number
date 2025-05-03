import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const GameMessage = ({ message, type = 'info' }) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={`message ${type}`}
    >
      {message}
    </motion.div>
  );
};

GameMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['info', 'error', 'success']),
};

export default GameMessage; 