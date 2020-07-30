import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedPatientData,
} from "./redux/selectors";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function RecordsView() {
  const data = useSelector(getSelectedPatientData);

  return (
  <div>
    {data && data.entry ? data.entry.map((entry, i) => {
      return (
      <Accordion key={i} style={{width: "50%"}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>{i}. {entry.resource.resourceType}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {JSON.stringify(entry.resource, null, 4)}
        </Typography>
      </AccordionDetails>
    </Accordion>
      )
    }) : ""}
  </div>
  );
}

export default RecordsView;
