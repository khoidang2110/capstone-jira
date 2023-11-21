import React from "react";
import { useDispatch } from "react-redux";
import { getArrProjectCategory } from "../../redux/action/addProject";
import { projectService } from "../../service/service";
import { Form } from "antd";

export default function NewProject() {
  let dispatch = useDispatch();
  projectService
    .projectCategory()
    .then((res) => {
      console.log(
        "🚀 ~ file: NewProject.jsx:12 ~ .then ~ res:",
        res.data.content
      );
    })
    .catch((err) => {
      console.log("🚀 ~ file: NewProject.jsx:15 ~ render ~ err:", err);
    });

  return (
    <div className="container py-20 px-5">
      <h3>New Project</h3>
      <Form>
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName" />
        </div>
      </Form>
    </div>
  );
}
