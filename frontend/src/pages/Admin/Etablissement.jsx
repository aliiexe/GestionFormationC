import React, { useState, useEffect } from "react";
import { Button, Form, Input, Table, Space, Modal, Select } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { axiosclient } from "../../api/axiosClient";

const { Option } = Select;

export default function Etablissement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [etablissement, setEtablissement] = useState({});
  const [etablissements, setEtablissements] = useState([]);
  const [updateEtablissement, setUpdateEtablissement] = useState(null);
  const [form] = Form.useForm();
  const [regions, setRegions] = useState([]);

  const deleteEtablissement = async (id) => {
    await axiosclient.delete("/etablissements/" + id).then(() => {
      fetchEtablissements();
      setIsModalOpen(true);
    });
  };

  const startUpdateEtablissement = (record) => {
    setUpdateEtablissement(record);
    setEtablissement(record);
    form.setFieldsValue(record);
  };

  const fetchEtablissements = async () => {
    await axiosclient.get("/etablissements").then((response) => {
      setEtablissements(response.data);
    });
  };

  const fetchRegions = async () => {
    await axiosclient.get("/regions").then((response) => {
      setRegions(response.data);
    });
  };

  const confirmUpdate = async () => {
    await axiosclient
      .put("/etablissements/" + updateEtablissement.id, etablissement)
      .then(() => {
        fetchEtablissements();
        setUpdateEtablissement(null);
        setEtablissement({});
        form.resetFields();
      });
  };

  const columns = [
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
        render: (region) => region ? region.nom_region : ""
      },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined onClick={() => startUpdateEtablissement(record)} />
          <DeleteOutlined onClick={() => deleteEtablissement(record.id)} />
        </Space>
      ),
    },
  ];

  const handleChange = (e) => {
    setEtablissement({ ...etablissement, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchEtablissements();
    fetchRegions();
  }, []);

  const createEtablissement = async () => {
    await axiosclient.post("/etablissements", etablissement).then(() => {
      fetchEtablissements();
      setEtablissement({});
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
        <p>Etablissement has been deleted</p>
      </Modal>

      <Form.Item>
        <h3 style={{ fontSize: "20px", marginLeft: "13px", borderBottom: "2px solid purple", maxWidth: 300 }}>Etablissements</h3>
      </Form.Item>
      <Table columns={columns} dataSource={etablissements} pagination={{ defaultPageSize: 6 }} rowKey="id" />

      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <h3 style={{ fontSize: "20px", marginLeft: "13px", maxWidth: 300, borderBottom: "2px solid purple", marginBottom: "40px" }}>
          {updateEtablissement ? "Update" : "Add"} Etablissement
        </h3>
        <Form.Item label="Nom" name="nom_efp" rules={[{ required: true, message: "Please fill the required field" }]}>
          <Input name="nom_efp" value={etablissement.nom_efp || ''} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Adresse" name="adresse" rules={[{ required: true, message: "Please fill the required field" }]}>
          <Input name="adresse" value={etablissement.adresse || ''} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Téléphone" name="telephone" rules={[{ required: true, message: "Please fill the required field" }]}>
          <Input name="telephone" value={etablissement.telephone || ''} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Ville" name="ville" rules={[{ required: true, message: "Please fill the required field" }]}>
          <Input name="ville" value={etablissement.ville || ''} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Région" name="regions_id" rules={[{ required: true, message: "Please select a region" }]}>
          <Select
            placeholder="Select a region"
            value={etablissement.regions_id || undefined}
            onChange={(value) => setEtablissement({ ...etablissement, regions_id: value })}
          >
            {regions.map(region => (
              <Option key={region.id} value={region.id}>{region.nom_region}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button onClick={updateEtablissement ? confirmUpdate : createEtablissement}>
            {updateEtablissement ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

