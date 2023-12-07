const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(cors());
var locatio;
var p;
const fetchWeatherData = async (latitude, longitude) => {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
     params: { q: `${latitude},${longitude}` },
    headers: {
      'X-RapidAPI-Key': 'c28136fdccmshaf75228cbfd6c84p1670bbjsnfd62dba1d24c',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response);
    locatio=response.data.location.name;
    return response.data; // Return the weather data or handle it as required
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch weather data');
  }
};

app.post('/predict', async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    if (!latitude || !longitude) {
      throw new Error('Latitude and longitude are required.');
    }

    const weatherData = await fetchWeatherData(latitude, longitude);
    const prediction = performPrediction(weatherData.current.wind_kph, weatherData.current.wind_degree);

    // Send both locatio and prediction in the response
    res.json({ p, locatio});
  } catch (error) {
    console.error('Prediction Error:', error);
    res.status(500).json({ error: error.message || 'Prediction failed' });
  }
});


// Initialize the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const { spawn } = require('child_process');

function performPrediction(windSpeed, windDirection) {
  // Prepare data
  const data = { windSpeed, windDirection };

  // Write the data to a file
  fs.writeFileSync('input_data.json', JSON.stringify(data));

  // Execute the Python script
  const pythonProcess = spawn('python3', ['predict.py']);



// ... (other code)

pythonProcess.stdout.on('data', () => {
  // Read the output_data.json file
  fs.readFile('output_data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading output_data.json:', err);
      return;
    }

    try {
      const predictionData = JSON.parse(data);
      p = parseFloat(predictionData.prediction[0]); // Extract the prediction value
      console.log('Prediction:', p);
      console.log('Location',locatio);
      // Use the prediction value as needed
      
    
   
   
    } catch (error) {
      console.error('Error parsing JSON from output_data.json:', error);
    }


    
  });
});

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error from Python script: ${data}`);
  });
}