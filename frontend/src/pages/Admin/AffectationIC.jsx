import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Modal, Table, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { axiosclient } from "../../api/axiosClient";

export default function AffectationIC() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [selectedAffectation, setSelectedAffectation] = useState(null);
  const [affectations, setAffectations] = useState([]);
  const [intervenants, setIntervenants] = useState([]);
  const [competences, setCompetences] = useState([]);
  const [certifications, setCertifications] = useState([]);

  const fetchAffectations = async () => {
    try {
      const response = await axiosclient.get("/affectations");
      if (Array.isArray(response.data.data)) { // Vérifiez si response.data.data est un tableau
        setAffectations(response.data.data); // Utilisez response.data.data pour accéder au tableau d'affectations
      } else {
        console.error("Les données récupérées pour les affectations ne sont pas un tableau :", response.data);
      }
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

  useEffect(() => {
    fetchAffectations();
    fetchIntervenants();
    fetchCompetences();
    fetchCertifications();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
    setSelectedAffectation(null);
    form.resetFields();
  };

  const showEditModal = (affectation) => {
    setIsModalVisible(true);
    setSelectedAffectation(affectation);
    form.setFieldsValue({
      intervenants_id: affectation.intervenants_id,
      competences_id: affectation.competences_id,
      certifications_id: affectation.certifications_id,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedAffectation(null);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      setIsLoading(true);
      const values = await form.validateFields();
      let response;
      if (selectedAffectation) {
        response = await axiosclient.put(`/affectations/${selectedAffectation.id}`, values);
        console.log(response);
      } else {
        response = await axiosclient.post("/affectations", values);
        console.log(response);
      }
      await fetchAffectations();
      setIsModalVisible(false);
      setSelectedAffectation(null);
      form.resetFields();
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la modification de l'affectation :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAffectation = async (id) => {
    try {
      await axiosclient.delete(`/affectations/${id}`);
      console.log("Affectation supprimée avec succès");
      await fetchAffectations();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'affectation :", error);
    }
  };

  const columns = [
    {
      title: 'Intervenant',
      dataIndex: 'intervenants_id',
      key: 'intervenants_id',
      render: (intervenants_id) => {
        const intervenant = intervenants.find((int) => int.id === intervenants_id);
        return intervenant ? intervenant.nom : 'N/A';
      },
    },
    {
      title: 'Compétence',
      dataIndex: 'competences_id',
      key: 'competences_id',
      render: (competences_id) => {
        const competence = competences.find((comp) => comp.id === competences_id);
        return competence ? competence.libelle : 'N/A';
      },
    },
    {
      title: 'Certification',
      dataIndex: 'certifications_id',
      key: 'certifications_id',
      render: (certifications_id) => {
        const certification = certifications.find((cert) => cert.id === certifications_id);
        return certification ? certification.intitule_certification : 'N/A';
      },
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
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        style={{ marginBottom: "1rem" }}
        loading={isLoading}
      >
        Ajouter Affectation
      </Button>
      <Table
  columns={columns}
  dataSource={affectations ? affectations.map(affectation => ({ ...affectation, key: affectation.id })) : []}
  loading={isLoading}
/>

      <Modal
        title={selectedAffectation ? "Modifier Affectation" : "Ajouter Affectation"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isLoading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="intervenants_id"
            label="Intervenant"
            rules={[{ required: true, message: "Veuillez sélectionner un intervenant" }]}
          >
            <Select>
              {intervenants.map((intervenant) => (
                <Select.Option key={intervenant.id} value={intervenant.id}>{intervenant.nom}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="competences_id"
            label="Compétence"
            rules={[{ required: true, message: "Veuillez sélectionner une compétence" }]}
          >
            <Select>
              {competences.map((competence) => (
<Select.Option key={competence.id} value={competence.id}>{competence.libelle}</Select.Option>
))}
</Select>
</Form.Item>
<Form.Item
name="certifications_id"
label="Certification"
rules={[{ required: true, message: "Veuillez sélectionner une certification" }]}
>
<Select>
{certifications.map((certification) => (
<Select.Option key={certification.id} value={certification.id}>{certification.intitule_certification}</Select.Option>
))}
</Select>
</Form.Item>
</Form>
</Modal>
</>
);
}
