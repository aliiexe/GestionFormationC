import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Form, Input, Button } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { axiosclient } from "../../api/axiosClient";

const Domaine = () => {
  const [domaines, setDomaines] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedDomaine, setSelectedDomaine] = useState(null);

  useEffect(() => {
    fetchDomaines();
  }, []);

  const fetchDomaines = async () => {
    try {
      const response = await axiosclient.get("/domaines");
      setDomaines(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des domaines :", error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setSelectedDomaine(null);
    form.resetFields();
  };

  const showEditModal = (domaine) => {
    setIsModalVisible(true);
    setSelectedDomaine(domaine);
    form.setFieldsValue(domaine);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedDomaine(null);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedDomaine) {
        await axiosclient.put(`/domaines/${selectedDomaine.id}`, values);
      } else {
        await axiosclient.post("/domaines", values);
      }
      fetchDomaines();
      setIsModalVisible(false);
      setSelectedDomaine(null);
      form.resetFields();
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la modification du domaine :", error);
    }
  };

  const deleteDomaine = async (id) => {
    try {
      await axiosclient.delete(`/domaines/${id}`);
      fetchDomaines();
    } catch (error) {
      console.error("Erreur lors de la suppression du domaine :", error);
    }
  };

  const columns = [
    {
      title: "Nom",
      dataIndex: "nom_domaine",
      key: "nom_domaine",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showEditModal(record)}>
            <EditOutlined />
          </a>
          <a onClick={() => deleteDomaine(record.id)}>
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
        Ajouter Domaine
      </Button>
      <Table columns={columns} dataSource={domaines} />

      <Modal
        title={selectedDomaine ? "Modifier Domaine" : "Ajouter Domaine"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nom_domaine"
            label="Nom"
            rules={[{ required: true, message: "Veuillez saisir le nom du domaine" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Domaine;
