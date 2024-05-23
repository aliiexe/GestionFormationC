import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Modal, Table, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { axiosclient } from "../../api/axiosClient";

export default function Certification() {
  const [certifications, setCertifications] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [domaines, setDomaines] = useState([]);

  const fetchCertifications = async () => {
    try {
      const response = await axiosclient.get("/certifications");
      setCertifications(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des certifications :", error);
    }
  };

  const fetchDomaines = async () => {
    try {
      const response = await axiosclient.get("/domaines");
      setDomaines(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des domaines :", error);
    }
  };

  useEffect(() => {
    fetchCertifications();
    fetchDomaines();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
    setSelectedCertification(null);
    form.resetFields();
  };

  const showEditModal = (certification) => {
    setIsModalVisible(true);
    setSelectedCertification(certification);
    form.setFieldsValue(certification);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedCertification(null);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedCertification) {
        await axiosclient.put(`/certifications/${selectedCertification.id}`, values);
      } else {
        await axiosclient.post("/certifications", values);
      }
      fetchCertifications();
      setIsModalVisible(false);
      setSelectedCertification(null);
      form.resetFields();
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la modification de la certification :", error);
    }
  };

  const deleteCertification = async (id) => {
    try {
      await axiosclient.delete(`/certifications/${id}`);
      fetchCertifications();
    } catch (error) {
      console.error("Erreur lors de la suppression de la certification :", error);
    }
  };

  const columns = [
    {
      title: 'Intitulé',
      dataIndex: 'intitule_certification',
      key: 'intitule_certification',
    },
    {
      title: 'Organisme',
      dataIndex: 'organisme_certification',
      key: 'organisme_certification',
    },
    {
      title: 'Type',
      dataIndex: 'typecertification',
      key: 'typecertification',
    },
    {
      title: 'Domaine',
      dataIndex: 'domaines_id',
      key: 'domaines_id',
      render: (domaines_id) => {
        const domaine = domaines.find((domaine) => domaine.id === domaines_id);
        return domaine ? domaine.nom_domaine : 'N/A';
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showEditModal(record)}><EditOutlined /></a>
          <a onClick={() => deleteCertification(record.id)}><DeleteOutlined /></a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ marginBottom: "1rem" }}>Ajouter Certification</Button>
      <Table columns={columns} dataSource={certifications} />

      <Modal
        title={selectedCertification ? "Modifier Certification" : "Ajouter Certification"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="intitule_certification"
            label="Intitulé"
            rules={[{ required: true, message: "Veuillez saisir l'intitulé de la certification" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="organisme_certification"
            label="Organisme"
            rules={[{ required: true, message: "Veuillez saisir l'organisme de la certification" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="typecertification"
            label="Type"
            rules={[{ required: true, message: "Veuillez saisir le type de la certification" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="domaines_id"
            label="Domaine"
            rules={[{ required: true, message: "Veuillez sélectionner le domaine de la certification" }]}
          >
            <Select>
              {domaines.map((domaine) => (
                <Select.Option key={domaine.id} value={domaine.id}>{domaine.nom_domaine}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
