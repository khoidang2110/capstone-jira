import { Button, ConfigProvider, Form, Input, Select, message } from "antd";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { usersManageService } from "../../service/service";

export default function TabUserSetting() {
  let { usersRedux } = useSelector((state) => state.usersManageReducer);
  console.log(
    "🚀 ~ file: TabUserSetting.jsx:5 ~ TabUserSetting ~ usersRedux:",
    usersRedux
  );
  let data = JSON.parse(localStorage.getItem("USER"));
  console.log(
    "🚀 ~ file: TabUserSetting.jsx:11 ~ TabUserSetting ~ data:",
    data
  );

  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFinish = (values) => {
    let updateUser = {
      id: values.id,
      passWord: values.passWord,
      email: values.email,
      name: values.name,
      phoneNumber: values.phoneNumber,
    };
    console.log(updateUser);
    usersManageService
      .editUser(updateUser)
      .then((res) => {
        message.success("Cập nhật thành công");
      })
      .catch((err) => {
        message.error("Cập nhật thất bại ");
        console.log("🚀 ~ file: TabUserSetting.jsx:36 ~ onFinish ~ err:", err);
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
    <div className="container">
      <div className="flex flex-col justify-center items-center">
        <h3 className="m-4 text-center">TabUserSetting</h3>
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
              id: data.id,
              name: data.name,
              passWord: "",
              email: data.email,
              phoneNumber: data.phoneNumber,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Id"
              name="id"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input disabled={true} />
            </Form.Item>

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
              <Input value={data.name} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="passWord"
              rules={[{ required: true }]}
            >
              <Input.Password />
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
              <Input value={data.email} />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input addonBefore={prefixSelector} value={data.phoneNumber} />
            </Form.Item>

            <Form.Item className="w-full flex justify-center items-center">
              <>
                {" "}
                <Button
                  type="text"
                  htmlType="submit"
                  style={{ backgroundColor: "#1890ff" }}
                  className="px-3 mx-2 lg:px-7 btnBlue"
                >
                  Edit
                </Button>
                <Button
                  className="px-3 mx-2 lg:px-7"
                  type="text"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  style={{ backgroundColor: "#808080", color: "white" }}
                >
                  Cancel
                </Button>
              </>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
}
