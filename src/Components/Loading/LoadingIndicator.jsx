// LoadingIndicator.js
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const LoadingIndicator = ({ isLoading }) => {
  return isLoading ? <LoadingSpinner /> : null;
};

export default LoadingIndicator;
