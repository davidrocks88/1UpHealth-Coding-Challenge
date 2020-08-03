import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "./redux/slices/auth";
import { setIndex, setPatientList, setData } from "./redux/slices/patients";
import {
  getAccessToken,
  getHasConnected,
  getSelectedPatientId,
  getPatientIdList,
} from "./redux/selectors";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RecordsView from './RecordsView';

const system_id = 4706; // Epic demo

function openQuickConnect(access_token) {
  const url =
    "https://quick.1up.health/connect/" +
    system_id +
    "?access_token=" +
    access_token;
  console.log(url);
  var win = window.open(url, "_blank");
  win.focus();
}

function App() {
  const dispatch = useDispatch();
  const hasConnected = useSelector(getHasConnected);
  const access_token = useSelector(getAccessToken);
  const patientId = useSelector(getSelectedPatientId);
  const patientList = useSelector(getPatientIdList);

  useEffect(() => {
    async function fetchData() {
      try {
        const authResponse = await axios.get("http://localhost:8000/auth");
        const token = authResponse.data.access_token;

        const patientResponse = await axios.get(
          "http://localhost:8000/fhir/patients?access_token=" + token
        );

        dispatch(setAuthToken(token));
        dispatch(setIndex(0));
        dispatch(setPatientList(patientResponse.data.patients));
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    async function fetchData() {
      const everythingResponse = await axios.get(
        "http://localhost:8000/fhir/patients/" +
          patientId +
          "/everything?access_token=" +
          access_token
      );
      const data = everythingResponse.data;
      dispatch(setData(data));
    }
    if (access_token && patientId) {
      fetchData();
    }
  }, [patientId, access_token, dispatch]);

  if (!hasConnected) {
    return (
      <div>
        <Button style={{padding: "1em", margin: "2em", borderWidth: ".1em", borderStyle: "solid"}} onClick={() => openQuickConnect(access_token)}>
          <Typography>Quick Connect to Epic Health System</Typography>
        </Button>
      </div>
    );
  }

  const handleChange = (e) => {
    dispatch(setIndex(e.target.value))
  };

  return (
    <div>
      <FormControl style={{width: "10em"}}>
        <InputLabel>Patient Id</InputLabel>
        <Select
          value={patientId}
          onChange={handleChange}
        >
          {patientList.map((p, i)=><MenuItem value={i}>{p}</MenuItem>)}
        </Select>
      </FormControl>
      <br />
      <RecordsView />
    </div>
  );
}

export default App;
