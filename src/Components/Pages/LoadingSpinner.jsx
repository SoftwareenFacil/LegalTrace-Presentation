import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../../Style/SpinerStyle.css';
const LoadingSpinner = () => (
  <div className="spinner-container">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Cargando...</span>
    </Spinner>
  </div>
);

export default LoadingSpinner;
