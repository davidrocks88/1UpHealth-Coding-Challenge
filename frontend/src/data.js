import { useEffect } from "react";
import { setDidCallback } from "./redux/slices/auth";
import { useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';


function Data() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(setDidCallback());
    history.replace(`/`)
  }, [dispatch, history]);
  return "";
}

export default Data;
