# 1Up Health Challenge

## How to run:

### Backend

#### Configuration
Create a `.env` file in the `/backend` directory with the following keys:
```
clientId=YOUR_CLIENT_ID
clientSecret=YOUR_CLIENT_SECRET
```

Additionally, you need to set the callback URL for your 1up app to be `http://localhost:8000`.

#### Running The Backend Server
To run the server, simply run `node index.js` in the `/backend` directory. This express server will run on port 8000 locally. If you want to change the port, you need to change your app's callback url too.

### Frontend
The frontend is simply a react app. Running `npm start` in the `/frontend` directory is enough.

## Using the App
First, connect using the Quick Connect button. This will redirect you to the app's main page with data. Select the desired patient ID, then observe how the data is populated from the $everywhere endpoint.

# Example
See the example at [1upmovie.mov](./1upmovie.mov)