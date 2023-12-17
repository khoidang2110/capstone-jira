import React from "react";
import {
  FacebookFilled,
  LockOutlined,
  MailOutlined,
  TwitterCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction, setInfoAction } from "../../redux/action/user";
export default function LoginPage() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinish = (values) => {
    // dispatch(setInfoAction(values));
    console.log("values", values);
    //let onSuccess = () => (window.location.href = "/");


    let onSuccess = () => (window.location.href = "/");
    dispatch(loginAction(values, onSuccess));

    
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Fail to login!!!")
  };
  return (
    <div>
      <div className="container " style={{ height: "auto", width: "auto" }}>
        <div className="flex flex-col justify-center items-center min-h-screen ">
          <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>
            {" "}
            LOGIN
          </h3>
          <Form
          className=" flex flex-col align-center justify-center login-form"
            style={{ paddingTop: "10px" }}
            name="normal_login"
            // className=""
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                style={{
                  // borderColor: "black",
                  // borderStyle: "dashed",
                  width: "300px",
                  height: "50px",
                }}
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="passWord"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                style={{
                  // borderColor: "black",
                  // borderStyle: "dashed",
                  width: "300px",
                  height: "50px",
                }}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="text"
                htmlType="submit"
                className="btnBlue"
                style={{
                  backgroundColor: "rgb(102, 117, 223)",
                  minWidth: "300px",
                }}
              >
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              Or{" "}
              <NavLink to={"/register"}>
                <a href="" style={{ color: "#FA264B" }}>
                  Register Now!
                </a>
              </NavLink>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
