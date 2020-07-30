const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.port || 8000;
const fhir = require('./fhir');

require('dotenv').config()

app.use(cors());
app.use((req, res, next)=> {
  console.log(req.method + " " + req.url);
  next();
})
app.use(bodyParser.json())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  console.log(req.query)

  res.redirect("http://localhost:3000/data")
});

app.use('/fhir', fhir);

app.get('/callback', (req, res) => {
  res.redirect("localhost:3000/callback")
});

app.get('/auth', async (req, res) => {
  try {
    const accessCode = await getAccessCode();
    const code = accessCode.data.code;
    console.log(code)
    const tokenResponse = await getAccessToken(code);
    console.log(tokenResponse.data)
    res.send(tokenResponse.data)
  }
  catch (e) { 
    console.log(e);
    res.send(404)
  }

})

async function getAccessCode() {
  const ACCESS_CODE_URL = "https://api.1up.health/user-management/v1/user/auth-code";
  const query = "app_user_id=12345&client_id="+process.env.clientId+"&client_secret="+process.env.clientSecret;
  return axios.post(`${ACCESS_CODE_URL}?${query}`)
}

async function getAccessToken(accessCode) {
  const url = `https://api.1up.health/fhir/oauth2/token?client_id=${process.env.clientId}&client_secret=${process.env.clientSecret}&code=${accessCode}&grant_type=authorization_code`;

  return axios.post(url);
}

app.listen(port, () => console.log(`Auth Service listening at http://localhost:${port}`))