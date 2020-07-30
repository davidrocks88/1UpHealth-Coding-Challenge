export const getAccessToken = state => state.auth.access_token;
export const getHasConnected = state => state.auth.didCallback;
export const getSelectedPatientId = state => state.patients.patientList[getSelectedPatientIndex(state)];
export const getSelectedPatientIndex = state => state.patients.index;
export const getSelectedPatientData = state => state.patients.data;
export const getPatientIdList = state => state.patients.patientList;