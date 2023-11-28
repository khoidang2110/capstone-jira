import { https } from "../../service/config";
import { GET_ARR_PROJECT_CATEGORY } from "../constant/newProject";

export let getArrProjectCategory = (payload) => ({
  type: GET_ARR_PROJECT_CATEGORY,
  payload,
});
