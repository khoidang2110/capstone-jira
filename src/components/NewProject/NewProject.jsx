import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { projectService } from "../../service/service";
import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Form,
  Input,
  Select,
  message,
} from "antd";

import { Option } from "antd/es/mentions";
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const NewProject = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  let dispatch = useDispatch();
  const [category, setCategory] = useState();
  const [randomNumber, setRandomNumber] = useState("11");
  console.log(" NewProject.jsx:10  NewProject category:", category);

  useEffect(() => {
    projectService
      .projectCategory()
      .then((res) => {
        // console.log(
        //   "🚀 ~ file: NewProject.jsx:12 ~ .then ~ res:",
        //   res.data.content
        // );
        setCategory(res.data.content);
      })
      .catch((err) => {
        console.log("🚀 ~ file: NewProject.jsx:15 ~ render ~ err:", err);
      });
  }, [randomNumber]);
  const onFinish = (values) => {
    projectService
      .createProjectAuthorize(values)
      .then((res) => {
        console.log(" NewProject.jsx:45 ~ .then ~ res:", res);
        message.success("Đăng ký thành công");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);

        form.resetFields();
        setRandomNumber(Math.random());
      })
      .catch((err) => {
        console.log("🚀 ~ file: NewProject.jsx:49 ~ onFinish ~ err:", err);
        message.error("Đăng ký thất bại");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {/* <HeaderBar /> */}
      <div className="">
        <h3
          className="m-4 text-center"
          style={{ fontWeight: 500, fontSize: 50 }}
        >
          New Project
        </h3>
        <Breadcrumb
          items={[
            {
              title: <NavLink to="/">Projects</NavLink>,
            },
            {
              title: "New Project",
            },
          ]}
        />
        <ConfigProvider
          theme={{
            //     token:{
            // margin:10
            //     },
            components: {
              Form: {
                itemMarginBottom: 20,
                verticalLabelPadding: 1,
              },
            },
          }}
        >
          <Form
            form={form}
            name="basic"
            // labelCol={{
            //   span: 8,
            // }}
            style={{
              maxWidth: 1300,
              maxHeight: 700,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item label="Project Name" name="projectname" rules={[]}>
              <Input
                style={{
                  borderColor: "black",
                  borderStyle: "dashed",
                  height: "50px",
                }}
              />
            </Form.Item>

            <Form.Item label="Project category" name="category" rules={[]}>
              <Select
                style={{
                  borderColor: "black",
                  borderStyle: "dashed",
                  height: "50px",
                }}
                defaultValue="Lựa chọn loại dự án "
              >
                {category?.map((item, index) => {
                  return (
                    <Option value={item.id} key={index}>
                      {item.projectCategoryName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item label="Description" name="description" rules={[]}>
              {/* <Editor
                name="description"
                // onInit={(evt, editor) => (editorRef.current = editor)}
                // initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                  height: 350,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              /> */}
              <Input.TextArea
                rows={4}
                style={{
                  borderColor: "black",
                  borderStyle: "dashed",
                  height: "350px",
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="px-3 mx-2 "
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#1890ff",
                  borderRadius: "30px",
                  minWidth: "500px",
                  height: "50px",
                }}
              >
                Submit
              </Button>
              <Button
                className="px-3 mx-2 "
                type="text"
                onClick={() => {
                  window.location.href = "/";
                }}
                style={{
                  backgroundColor: "#808080",
                  borderRadius: "30px",
                  color: "white",
                  minWidth: "500px",
                  height: "50px",
                }}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
};
export default NewProject;
