import { api } from "../helpers/configAxios";

export const addDataToExcel = (data) =>
  api()
    .post("/excel", data)
    .then(data => data.data)
    .catch((err) => err);
