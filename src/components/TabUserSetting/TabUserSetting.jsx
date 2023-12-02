import { Button, ConfigProvider, Form, Input, Select } from "antd";
import React from "react";
import { useSelector } from "react-redux";

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

  const onFinish = (values) => {
    console.log("Success:", values);
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
              name: data.name,
              email: data.email,
              phoneNumber: data.phoneNumber,
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
              <Input value={data.name} />
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

            <Form.Item>
              <Button
                type="text"
                htmlType="submit"
                style={{ backgroundColor: "#1890ff" }}
                className="px-3 mx-2 lg:px-7 btnBlue"
              >
                Edit
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
}
