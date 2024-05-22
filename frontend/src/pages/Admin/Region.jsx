import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Form, Input, Button, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { axiosclient } from "../../api/axiosClient";

const { Option } = Select;

const Region = () => {
  const [regions, setRegions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await axiosclient.get("/regions");
      setRegions(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des régions :", error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setSelectedRegion(null);
    form.resetFields();
  };

  const showEditModal = (region) => {
    setIsModalVisible(true);
    setSelectedRegion(region);
    form.setFieldsValue(region);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRegion(null);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedRegion) {
        await axiosclient.put(`/regions/${selectedRegion.id}`, values);
      } else {
        await axiosclient.post("/regions", values);
      }
      fetchRegions();
      setIsModalVisible(false);
      setSelectedRegion(null);
      form.resetFields();
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la modification de la région :", error);
    }
  };

  const deleteRegion = async (id) => {
    try {
      await axiosclient.delete(`/regions/${id}`);
      fetchRegions();
    } catch (error) {
      console.error("Erreur lors de la suppression de la région :", error);
    }
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
          <a onClick={() => showEditModal(record)}>
            <EditOutlined />
          </a>
          <a onClick={() => deleteRegion(record.id)}>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        style={{ marginBottom: "1rem" }}
      >
        Ajouter Région
      </Button>
      <Table columns={columns} dataSource={regions} />

      <Modal
        title={selectedRegion ? "Modifier Région" : "Ajouter Région"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nom_region"
            label="Nom"
            rules={[{ required: true, message: "Veuillez saisir le nom de la région" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Region;
