
import pickle
import json
import warnings
from sklearn.exceptions import ConvergenceWarning

warnings.filterwarnings("ignore", category=ConvergenceWarning)

# Read the input data written by Node.js
with open('input_data.json', 'r') as file:
    input_data = json.load(file)

# Extract wind speed and wind direction
wind_speed = input_data['windSpeed']
wind_direction=input_data['windDirection']
print(wind_speed)
# Load the model from the pickle file
with open('predict.pkl', 'rb') as file:
    model = pickle.load(file)

# Perform prediction
prediction = model.predict([[wind_speed, wind_direction]])  

# Write the prediction result to a file
output_data = {'prediction': prediction.tolist()}  # Convert numpy array to a list
with open('output_data.json', 'w') as file:
    json.dump(output_data, file)
