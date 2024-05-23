import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Form, Input, Button, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { axiosclient } from "../../api/axiosClient";

const { Option } = Select;

const Etablissement = () => {
  const [etablissements, setEtablissements] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [regions, setRegions] = useState([]);
  const [selectedEtablissement, setSelectedEtablissement] = useState(null);

  useEffect(() => {
    fetchEtablissements();
    fetchRegions();
  }, []);

  const fetchEtablissements = async () => {
    try {
      const response = await axiosclient.get("/etablissement");
      setEtablissements(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des établissements :", error);
    }
  };

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
    setSelectedEtablissement(null); // Réinitialiser les données de l'établissement sélectionné
    form.resetFields(); // Réinitialiser les champs du formulaire
  };

  const showEditModal = (etablissement) => {
    setIsModalVisible(true);
    setSelectedEtablissement(etablissement); // Définir les données de l'établissement sélectionné
    form.setFieldsValue(etablissement); // Mettre à jour les champs du formulaire avec les données de l'établissement sélectionné
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedEtablissement(null); // Réinitialiser les données de l'établissement sélectionné
    form.resetFields(); // Réinitialiser les champs du formulaire
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedEtablissement) {
        // Si un établissement est sélectionné, effectuez une mise à jour
        await axiosclient.put(`/etablissement/${selectedEtablissement.id}`, values);
      } else {
        // Sinon, effectuez une création
        await axiosclient.post("/etablissement", values);
      }
      fetchEtablissements();
      setIsModalVisible(false);
      setSelectedEtablissement(null); // Réinitialiser les données de l'établissement sélectionné
      form.resetFields(); // Réinitialiser les champs du formulaire
    } catch (error) {
      console.error("Erreur lors de l'ajout ou de la modification de l'établissement :", error);
    }
  };
  const deleteEtablissement = async (id) => {
    try {
      await axiosclient.delete(`/etablissement/${id}`);
      fetchEtablissements();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'établissement :", error);
    }
  };
  const columns = [
    // Configuration des colonnes du tableau
    {
      title: "Nom",
      dataIndex: "nom_efp",
      key: "nom_efp",
    },
    {
      title: "Adresse",
      dataIndex: "adresse",
      key: "adresse",
    },
    {
      title: "Téléphone",
      dataIndex: "telephone",
      key: "telephone",
    },
    {
      title: "Ville",
      dataIndex: "ville",
      key: "ville",
    },
    {
      title: "Région",
      dataIndex: "region",
      key: "region",
      render: (region) => (region ? region.nom_region : ""),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showEditModal(record)}>
            <EditOutlined />
          </a>
          <a onClick={() => deleteEtablissement(record.id)}>
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
        Ajouter Etablissement
      </Button>
      <Table columns={columns} dataSource={etablissements} />
      <Modal
        title={selectedEtablissement ? "Modifier Etablissement" : "Ajouter Etablissement"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item             name="nom_efp"
            label="Nom"
            rules={[{ required: true, message: "Veuillez saisir le nom" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="adresse"
            label="Adresse"
            rules={[{ required: true, message: "Veuillez saisir l'adresse" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="telephone"
            label="Téléphone"
            rules={[{ required: true, message: "Veuillez saisir le téléphone" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ville"
            label="Ville"
            rules={[{ required: true, message: "Veuillez saisir la ville" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="regions_id"
            label="Région"
            rules={[{ required: true, message: "Veuillez sélectionner une région" }]}
          >
            <Select>
              {regions.map(region => (
                <Option key={region.id} value={region.id}>
                  {region.nom_region}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Etablissement;

