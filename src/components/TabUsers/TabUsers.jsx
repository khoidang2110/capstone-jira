import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  Modal,
  Space,
  Table,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { usersManageService } from "../../service/service";
import { setUsersData } from "../../redux/action/userManage";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
export default function TabUsers() {
  const dispatch = useDispatch();
  let { usersRedux } = useSelector((state) => state.usersManageReducer);
  const [userData, setUserData] = useState();
  const [randomNumber, setRandomNumber] = useState(11);
  // console.log("user data",userData)
  useEffect(() => {
    setUserData(usersRedux)
  },[]);

  useEffect(() => {
    usersManageService
    .getUsersList()
    .then((result) => {
      // console.log("users list layout", result.data.content);
      // dispatch(setUsersData(result.data.content));
      setUserData(result.data.content);
    })
    .catch((err) => {
      console.log("err", err);
    });
  }, [randomNumber]);
  // console.log("usersDataRedux", usersRedux);

  // Drawer Edit
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [user, setUser] = useState("");
  // console.log("user", user);

  const showDrawer = () => {
    form.resetFields();
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    // console.log("values", values);
    let dataEdit = {
      id: values.userId,
      passWord: values.passWord,
      email: values.email,
      name: values.name,
      phoneNumber: values.phoneNumber,
    };
    usersManageService
      .editUser(dataEdit)
      .then((res) => {
        message.success("Edit thành công");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
        setRandomNumber(Math.random());
      })
      .catch((err) => {
        console.log("err", err);
        message.error("Edit thất bại");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

// Filter User
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  // Modal Delete
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState();
  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
       width: 80,
      sorter: (item2, item1) => {
        return item2.userId - item1.userId;
      },
      sortDirections: ['descend'],
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (item2, item1) => {
        let name2 = item2.name?.trim().toLowerCase();
        let name1 = item1.name?.trim().toLowerCase();
        if (name2 < name1){
          return -1;
        }
        return 1;
      },
       width: 150,
      ...getColumnSearchProps('name'),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (item2, item1) => {
        let name2 = item2.email?.trim().toLowerCase();
        let name1 = item1.email?.trim().toLowerCase();
        if (name2 < name1){
          return -1;
        }
        return 1;
      },
       width: 200,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      sorter: (item2, item1) => {
        return item2.phoneNumber - item1.phoneNumber;
      },
      sortDirections: ['descend'],
       width: 150,
    },
    {
      title: "Action",
      key: "action",

      render: (_, record) => {
        return (
          <Space size="middle">
            <Button
              className="btnBlue"
              // type="text"
              icon={<EditOutlined />}
              onClick={() => {
                usersManageService
                  .getUser(record.userId)
                  .then((res) => {
                    // console.log("res", res)
                    setUser(res.data.content[0]);
                    setTimeout(() => {
                      showDrawer();
                    }, 100);
                  })
                  .catch((err) => {
                    console.log("err", err);
                  });
              }}
            ></Button>
            <Button
              type="text"
              className="btnRed"
              icon={<DeleteOutlined />}
              onClick={() => {
                // console.log(record);
                setDeleteUser(record);
                setIsModalOpen(true);
              }}
            ></Button>
          </Space>
        );
      },
    },
  ];
  const handleOk = () => {
    usersManageService
      .deleteUser(deleteUser.userId)
      .then((res) => {
        message.success("Xóa thành công!");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
        setRandomNumber(Math.random());
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
  return (
    <div
      className=""
      //  style={{
      //   margin: '24px 16px',
      //   padding: 24,
      //   minHeight: 280,

      // }}
    >
      <div className="mb-2 font-medium">USER MANAGEMENT</div>
      <Table
        columns={columns}
        dataSource={userData}
        onChange={onChange}
        scroll={{
          y: 280,
        }}
        rowKey={"userId"}
      />
      <Drawer
        title="Edit User"
        width={300}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form
          form={form}
          initialValues={{
            userId: user?.userId,
            name: user?.name,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            avatar: user?.avatar,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          // layout="vertical"
        >
          <Form.Item name="userId" label="">
            <Input values={user?.userId} disabled={true} addonBefore="User Id:"/>
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Tên không được để trống",
              },
            ]}
            hasFeedback
          >
            <Input values={user?.name} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Email không được để trống",
              },
              { type: "email", message: "Email không đúng định dạng" },
            ]}
            hasFeedback
          >
            <Input values={user?.email} />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Số ĐT không được để trống",
              },
            ]}
            hasFeedback
          >
            <Input values={user?.phoneNumber} />
          </Form.Item>
          <Space style={{width:"100%", justifyContent:"center"}}>
            <Button onClick={onClose} type="primary btnBlue" htmlType="submit">
              Submit
            </Button>
            <Button onClick={onClose} className="btnCancel" type="text">Cancel</Button>
          </Space>
        </Form>
      </Drawer>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={400}
      >
        <p>Are you sure to delete this user: {deleteUser?.name}</p>
      </Modal>
    </div>
  );
}
