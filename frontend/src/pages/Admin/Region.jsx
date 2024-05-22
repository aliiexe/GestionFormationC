import React, { useState, useEffect } from "react";
import { Button, Form, Input, Table, Space, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { axiosclient } from "../../api/axiosClient";

export default function Region() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [region, setRegion] = useState({});
  const [regions, setRegions] = useState([]);
  const [updateRegion, setUpdateRegion] = useState(null);
  const [form] = Form.useForm();

  const deleteRegion = async (id) => {
    await axiosclient.delete("/regions/" + id).then(() => {
      fetchRegions();
      setIsModalOpen(true);
    });
  };

  const startUpdateRegion = (record) => {
    setUpdateRegion(record);
    setRegion(record);
    form.setFieldsValue(record);
  };

  const fetchRegions = async () => {
    await axiosclient.get("/regions").then((response) => {
      setRegions(response.data);
    });
  };

  const confirmUpdate = async () => {
    await axiosclient.put("/regions/" + updateRegion.id, region).then(() => {
      fetchRegions();
      setUpdateRegion(null);
      setRegion({});
      form.resetFields();
    });
  };

  const columns = [
    {
      title: "Nom",
      dataIndex: "nom_region",
      key: "nom_region",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined onClick={() => startUpdateRegion(record)} />
          <DeleteOutlined onClick={() => deleteRegion(record.id)} />
        </Space>
      ),
    },
  ];

  const handleChange = (e) => {
    setRegion({ ...region, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  const createRegion = async () => {
    await axiosclient.post("/regions", region).then(() => {
      fetchRegions();
      setRegion({});
      form.resetFields();
    });
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        title="Notification"
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setIsModalOpen(false)}>
            Ok
          </Button>,
        ]}
      >
        <p>Region has been deleted</p>
      </Modal>

      <Form.Item>
        <h3 style={{ fontSize: "20px", marginLeft: "13px", borderBottom: "2px solid purple", maxWidth: 300 }}>Regions</h3>
      </Form.Item>
      <Table columns={columns} dataSource={regions} pagination={{ defaultPageSize: 6 }} rowKey="id" />

      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <h3 style={{ fontSize: "20px", marginLeft: "13px", maxWidth: 300, borderBottom: "2px solid purple", marginBottom: "40px" }}>
          {updateRegion ? "Update" : "Add"} Region
        </h3>
        <Form.Item label="Nom" name="nom_region" rules={[{ required: true, message: "Please fill the required field" }]}>
          <Input name="nom_region" value={region.nom_region || ''} onChange={handleChange} />
        </Form.Item>
        <Form.Item>
          <Button onClick={updateRegion ? confirmUpdate : createRegion}>
            {updateRegion ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
      </>
  );
}
