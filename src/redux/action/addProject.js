import { https } from "../../service/config";
import { GET_ARR_PROJECT_CATEGORY } from "../constant/newProject";

export let getArrProjectCategory = (payload) => ({
  type: GET_ARR_PROJECT_CATEGORY,
  payload,
});

// export const callProjectCategory = () => async (dispatch) => {
//   try {
//     const apiProjectCategory = await https.get("/api/ProjectCategory");
//     dispatch(getArrProjectCategory(apiProjectCategory.data.content));
//   } catch (err) {
//     console.log(err.response?.data);
//   }
// };

// export const callCreateProject = (values) => async (dispatch) => {
//   try {
//     const apicreateProject = await https.post(
//       "/api/Project/createProjectAuthorize",
//       values
//     );
//     alert("Đăng ký thành công");
//   } catch (err) {
//     console.log(err.response?.data);
//     alert(err.response?.data.message);
//   }
// };
