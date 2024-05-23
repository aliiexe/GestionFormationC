import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Modal, Table, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { axiosclient } from "../../api/axiosClient";

const { Option } = Select;

export default function AffectationIC() {
  const [affectations, setAffectations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedAffectation, setSelectedAffectation] = useState(null);
  const [intervenants, setIntervenants] = useState([]);
  const [competences, setCompetences] = useState([]);
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    fetchAffectations();
    fetchIntervenants();
    fetchCompetences();
    fetchCertifications();
  }, []);

  const fetchAffectations = async () => {
    try {
      const response = await axiosclient.get("/affectations");
      setAffectations(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des affectations :", error);
    }
  };

  const fetchIntervenants = async () => {
    try {
      const response = await axiosclient.get("/intervenant");
      setIntervenants(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des intervenants :", error);
    }
  };

  const fetchCompetences = async () => {
    try {
      const response = await axiosclient.get("/competences");
      setCompetences(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des compétences :", error);
    }
  };

  const fetchCertifications = async () => {
    try {
      const response = await axiosclient.get("/certifications");
      setCertifications(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des certifications :", error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setSelectedAffectation(null);
    form.resetFields();
  };

  const showEditModal = (affectation) => {
    setIsModalVisible(true);
    setSelectedAffectation(affectation);
    form.setFieldsValue({
      ...affectation,
      intervenant_id: affectation.intervenant?.id,
      competence_id: affectation.competence?.id,
      certifications_id: affectation.certification?.id,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedAffectation(null);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedAffectation) {
        await axiosclient.put(`/affectations/${selectedAffectation.id}`, values);
      } else {
        await axiosclient.post("/affectations", values);
      }
      fetchAffectations();
      setIsModalVisible(false);
      setSelectedAffectation(null);
      form.resetFields();
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la modification de l'affectation :", error);
    }
  };

  const deleteAffectation = async (id) => {
    try {
      await axiosclient.delete(`/affectations/${id}`);
      fetchAffectations();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'affectation :", error);
    }
  };

  const columns = [
    {
      title: 'Intervenant',
      dataIndex: ['intervenant', 'nom'],
      key: 'intervenant',
    },
    {
      title: 'Compétence',
      dataIndex: ['competence', 'libelle'],
      key: 'competence',
    },
    {
      title: 'Certification',
      dataIndex: ['certification', 'intitule_certification'],
      key: 'certification',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showEditModal(record)}><EditOutlined /></a>
          <a onClick={() => deleteAffectation(record.id)}><DeleteOutlined /></a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ marginBottom: "1rem" }}>Ajouter Affectation</Button>
      <Table columns={columns} dataSource={affectations} rowKey="id" />

      <Modal
        title={selectedAffectation ? "Modifier Affectation" : "Ajouter Affectation"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="intervenant_id"
            label="Intervenant"
            rules={[{ required: true, message: "Veuillez sélectionner un intervenant" }]}
          >
            <Select placeholder="Sélectionnez un intervenant">
              {intervenants.map((intervenant) => (
                <Option key={intervenant.id} value={intervenant.id}>{intervenant.nom}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="competence_id"
            label="Compétence"
            rules={[{ required: true, message: "Veuillez sélectionner une compétence" }]}
          >
            <Select placeholder="Sélectionnez une compétence">
              {competences.map((competence) => (
                <Option key={competence.id} value={competence.id}>{competence.libelle}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="certifications_id"
            label="Certification"
            rules={[{ required: true, message: "Veuillez sélectionner une certification" }]}
          >
            <Select placeholder="Sélectionnez une certification">
              {certifications.map((certification) => (
                <Option key={certification.id} value={certification.id}>{certification.intitule_certification}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
