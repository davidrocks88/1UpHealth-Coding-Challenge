const express = require('express');
const router = express.Router();
const axios = require('axios');

const patients = [
  "2981ecddd6bc",
  "14ce9f792ac4"
]
router.get('/patients', function (req, res) {
  res.send({patients});
})

router.get('/patients/:patientid/everything', async function (req, res) {
  const everythingEndpoint = "https://api.1up.health/fhir/dstu2/Patient/" + req.params.patientid + "/$everything";
  const accessToken = req.query.access_token;
  if (!accessToken) {
    res.sendStatus(403);
  }

  console.log(everythingEndpoint)

  axios.get(everythingEndpoint, {
    headers: {
      "Authorization": "Bearer " + accessToken
    }
  })
    .then(response => res.send(response.data))
    .catch(err => {
      console.log(err)
      res.send(404)
    })
})

module.exports = router;