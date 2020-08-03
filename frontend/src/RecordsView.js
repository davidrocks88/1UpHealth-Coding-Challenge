import React from "react";
import { useSelector } from "react-redux";
import { getSelectedPatientData } from "./redux/selectors";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function PatientRecordView({ resource }) {
  return (
    <div>
      <p>
        <b>Name: </b>Given - {resource.name && resource.name[0].given}, Use -{" "}
        {resource.name && resource.name[0].text}
      </p>
      <p>
        <b>Gender: </b> {resource.gender}
      </p>
      <p>
        <em>Last Updated: {resource.meta.lastUpdated}</em>
      </p>
    </div>
  );
}

function RelatedPersonRecordView({ resource }) {
  return (
    <div>
      <p>
        <b>Name: </b>Given - {resource.name && resource.name.given}
      </p>
      <p>
        <b>Gender: </b> {resource.gender}
      </p>
      <p>
        <b>Relationship: </b> {resource.relationship.coding[0].code}
      </p>
      {resource.telcom &&
        resource.telcom.map((t) => (
          <p>
            {t.system} ({t.use}): {t.value}
          </p>
        ))}
      <p>
        <em>Last Updated: {resource.meta.lastUpdated}</em>
      </p>
    </div>
  );
}

function RecordsView() {
  const data = useSelector(getSelectedPatientData);

  return (
    <div>
      {data && data.entry
        ? data.entry.map((entry, i) => {
            let record;
            switch (entry.resource.resourceType) {
              case "Patient":
                record = <PatientRecordView resource={entry.resource} />;
                break;

              case "RelatedPerson":
                record = <RelatedPersonRecordView resource={entry.resource} />;
                break;

              default:
                break;
            }

            return (
              <Accordion key={i} style={{ width: "50%" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    {i}. {entry.resource.resourceType}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>{record}</AccordionDetails>
              </Accordion>
            );
          })
        : ""}
    </div>
  );
}

export default RecordsView;
