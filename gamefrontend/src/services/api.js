import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
});

export const startGame = async (minNumber, maxNumber) => {
  try {
    const response = await api.post('/game/start', {
      min_number: parseInt(minNumber),
      max_number: parseInt(maxNumber)
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Error starting game';
  }
};

export const makeGuess = async (guess) => {
  try {
    const response = await api.post('/game/guess', {
      guess: parseInt(guess)
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Error making guess';
  }
}; 