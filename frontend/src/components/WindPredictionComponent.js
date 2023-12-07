import React, { useState } from 'react';
import axios from 'axios';
import './WindPredictionComponent.css'; // Import CSS file

const WindPredictionComponent = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [locatio, setLocatio] = useState('');

  const handlePrediction = async () => {
    try {
      const response = await axios.post('http://localhost:3001/predict', {
        latitude,
        longitude,
      });

      const { data } = response;

      // Extract prediction and locatio values from the response data
      const { p: predictedValue, locatio: locationValue } = data;

      // Update state with received values
      setPrediction(predictedValue);
      setLocatio(locationValue);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  return (
    <div className="wind-prediction-container">
      <div className="input-group">
        <p>Enter the latitude and longitude of any place to check if the location is suitable for establishment of windmills for personal, business or public use.</p>
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Enter Latitude"
        />
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Enter Longitude"
        />
        <button onClick={handlePrediction}>Predict</button>
      </div>

      <div className="result">
        {locatio && (
          <table className="table-container" style={{ backgroundColor: '#c2f0fc' }}>
            <thead>
              <tr>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{locatio}</td>
              </tr>
            </tbody>
          </table>
        )}
        {prediction && (
          <table className="table-container" style={{ backgroundColor: '#e2f8dc' }}>
            <thead>
              <tr>
                <th>Prediction (kW)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{prediction}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WindPredictionComponent;
