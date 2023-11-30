import React from "react";
import {
  FacebookFilled,
  LockOutlined,
  MailOutlined,
  TwitterCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/action/user";
export default function LoginPage() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("values", values);
    let onSuccess = () => (window.location.href = "/");
    //navigate('/')

    dispatch(loginAction(values, onSuccess));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <div className="container " style={{ height: "auto", width: "auto" }}>
        <div className="flex flex-col justify-center items-center min-h-screen ">
          <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>
            {" "}
            Login
          </h3>
          <Form
            style={{ paddingTop: "10px" }}
            name="normal_login"
            className="login-form"
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
                  minWidth: "200px",
                }}
              >
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              Or{" "}
              <NavLink to={"/register"}>
                <a href="" style={{ color: "#0082f8" }}>
                  register now!
                </a>
              </NavLink>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
