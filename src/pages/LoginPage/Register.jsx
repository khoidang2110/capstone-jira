import {
  Alert,
  Button,
  ConfigProvider,
  Form,
  Input,
  Select,
  message,
} from "antd";
import React from "react";
import { userService } from "../../service/service";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/action/user";

function Register() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { Option } = Select;
  const onFinish = (values) => {
    console.log("Success:", values);
    let newUser = {
      email: values?.email,
      passWord: values?.passWord,
      name: values?.name,
      phoneNumber: values?.prefix + values?.phone,
    };
    userService
      .register(newUser)
      .then((res) => {
        message.success("Đăng ký thành công");
        let inforUser = {
          email: values?.email,
          passWord: values?.passWord,
        };
        let onSuccess = () => {
          window.location.href = "/";
        };
        dispatch(loginAction(inforUser, onSuccess));
        form.resetFields();
      })
      .catch((err) => {
        console.log("🚀 ~ file: Register.jsx:22 ~ onFinish ~ err:", err);
        message.error("Đăng ký thất bại");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
        defaultValue="86"
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div>
      <div className="register container">
        <div className="flex flex-col justify-center items-center ">
          <h3 className="m-4 text-center">FORM REGISTER</h3>
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
              className=""
              form={form}
              name="register"
              style={{
                maxWidth: 800,
                maxHeight: 800,
              }}
              initialValues={{
                name: "",
                passWord: "",
                email: "",
                phoneNumber: "",
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Alert message="Create Password" type="info" showIcon />

              <Form.Item
                label="Password"
                name="passWord"
                rules={[{ required: true }]}
              >
                <Input type="password" />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="password2"
                dependencies={["passWord"]}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("passWord") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input type="password" />
              </Form.Item>

              <Form.Item
                label="Email :"
                name={"email"}
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Email không hợp lệ!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              <Form.Item className="w-full flex justify-center items-center">
                <>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ backgroundColor: "#1890ff" }}
                    className="px-3 mx-2 lg:px-7"
                  >
                    Register
                  </Button>
                  <Button htmlType="reset" danger className="px-3 mx-2 lg:px-7">
                    Xóa
                  </Button>
                  <Button
                    className="px-3 mx-2 lg:px-7"
                    onClick={() => {
                      window.location.href = "/login";
                    }}
                    style={{ backgroundColor: "#808080", color: "white" }}
                  >
                    BACK
                  </Button>
                </>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}
export default Register;