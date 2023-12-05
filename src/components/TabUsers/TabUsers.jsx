import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Table, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { usersManageService } from "../../service/service";
import { setUsersData } from "../../redux/action/userManage";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
export default function TabUsers() {
  const dispatch = useDispatch();
  let { usersRedux } = useSelector((state) => state.usersManageReducer);
  console.log("usersDataRedux", usersRedux);

  // Modal Delete
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState();

  const handleOk = () => {
    setIsModalOpen(false);
    usersManageService
      .deleteUser(deleteUser.userId)
      .then((res) => {
        message.success("Xóa user thành công");
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.content);
      })
      .finally(setIsModalOpen(false));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      // width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
      // width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
      // width: 200,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      // width: 150,
    },
    {
      title: "Action",
      key: "action",

      render: (_, record) => (
        <Space size="middle">
          <Button
            className="btnBlue"
            type="text"
            icon={<EditOutlined />}
          ></Button>
          <Button
            type="text"
            className="btnRed"
            icon={<DeleteOutlined />}
            onClick={() => {
              setDeleteUser(record);
              setIsModalOpen(true);
            }}
          ></Button>
        </Space>
      ),
    },
  ];

  return (
    <div
      className=""
      //  style={{
      //   margin: '24px 16px',
      //   padding: 24,
      //   minHeight: 280,

      // }}
    >
      <div>USER MANAGEMENT</div>
      <Table
        columns={columns}
        dataSource={usersRedux}
        onChange={onChange}
        scroll={{
          y: 280,
        }}
      />
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Xác nhận xóa thông tin user: {deleteUser?.userId}</p>
      </Modal>
    </div>
  );
}
