import PropTypes from 'prop-types';

const GameInput = ({ label, value, onChange, type = 'number', required = true, ...props }) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
    </div>
  );
};

GameInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
};

export default GameInput; 