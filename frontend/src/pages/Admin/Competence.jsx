import React, { useState, useEffect } from 'react';
import { Table, Space, Modal, Form, Input, Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { axiosclient } from '../../api/axiosClient';

const Competence = () => {
  const [competences, setCompetences] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedCompetence, setSelectedCompetence] = useState(null);

  useEffect(() => {
    fetchCompetences();
  }, []);

  const fetchCompetences = async () => {
    try {
      const response = await axiosclient.get('/competences');
      setCompetences(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences :', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setSelectedCompetence(null);
    form.resetFields();
  };

  const showEditModal = (competence) => {
    setIsModalVisible(true);
    setSelectedCompetence(competence);
    form.setFieldsValue(competence);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedCompetence(null);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedCompetence) {
        await axiosclient.put(`/competences/${selectedCompetence.id}`, values);
      } else {
        await axiosclient.post('/competences', values);
      }
      fetchCompetences();
      setIsModalVisible(false);
      setSelectedCompetence(null);
      form.resetFields();
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la modification de la compétence :", error);
    }
  };

  const deleteCompetence = async (id) => {
    try {
      await axiosclient.delete(`/competences/${id}`);
      fetchCompetences();
    } catch (error) {
      console.error('Erreur lors de la suppression de la compétence :', error);
    }
  };

  const columns = [
    {
      title: 'Libellé',
      dataIndex: 'libelle',
      key: 'libelle',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showEditModal(record)}>
            <EditOutlined />
          </a>
          <a onClick={() => deleteCompetence(record.id)}>
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
        style={{ marginBottom: '1rem' }}
      >
        Ajouter Compétence
      </Button>
      <Table columns={columns} dataSource={competences} />

      <Modal
        title={selectedCompetence ? 'Modifier Compétence' : 'Ajouter Compétence'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="libelle"
            label="Libellé"
            rules={[{ required: true, message: 'Veuillez saisir le libellé de la compétence' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Veuillez saisir la description de la compétence' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Competence;
