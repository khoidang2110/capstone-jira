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
        <ConfigProvider
          theme={{
            //     token:{
            // margin:10
            //     },
            components: {
              Form: {
                itemMarginBottom: 10,
                verticalLabelPadding: 1,
              },
            },
          }}
        >
          <Form
            className=" flex flex-col align-center justify-center"
            form={form}
            name="register"
            style={
              {
                // maxWidth: 1000,
                // maxHeight: 1000,
                width:300
              }
            }
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
            // layout="vertical"
          >
         
            <div className="mb-2 font-medium text-center ">EDIT USER</div>
            <Form.Item
         
              label=""
              name="id"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input
               addonBefore="ID:"
                style={{
                  // borderColor: "black",
                  // borderStyle: "dashed",
                  // width: "400px",
                  // height: "50px",
                }}
                disabled={true}
              />
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
              <Input
                style={{
                  // borderColor: "black",
                  // borderStyle: "dashed",
                  // width: "400px",
                  // height: "50px",
                }}
                value={data.name}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="passWord"
              rules={[{ required: true }]}
            >
              <Input.Password
                style={{
                  // borderColor: "black",
                  // borderStyle: "dashed",
                  // width: "400px",
                  // height: "50px",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Email :"
              name={"email"}
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "The email address is illegal!",
                },
              ]}
            >
              <Input
                style={{
                  // borderColor: "black",
                  // borderStyle: "dashed",
                  // width: "400px",
                  // height: "50px",
                }}
                value={data.email}
              />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input
                style={{
                  // borderColor: "black",
                  // borderStyle: "dashed",
                  // width: "400px",
                  // height: "50px",
                }}
                // addonBefore={prefixSelector}
                value={data.phoneNumber}
              />
            </Form.Item>

            <Form.Item className="w-full flex justify-center items-center">
              <>
                {" "}
                <Button
                  type="text"
                  htmlType="submit"
                  style={{
                    backgroundColor: "#1890ff",
                    minWidth: "100px",
                    borderRadius: "30px",
                  }}
                  className="btnBlue"
                >
                  Edit
                </Button>
                <Button
                  className="px-3 mx-2 btnCancel"
                  type="text"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  style={{
                    backgroundColor: "#808080",
                    color: "white",
                    borderRadius: "30px",
                    minWidth: "100px",
                  }}
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
