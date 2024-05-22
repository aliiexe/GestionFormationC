import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Radio, Select, List, message } from 'antd';
import { axiosclient } from '../../api/axiosClient'

const { Option } = Select;

const Certification = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [certifications, setCertifications] = useState([]);
  const [domaines, setDomaines] = useState([]);
  const [intervenants, setIntervenants] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchCertifications();
    fetchDomainesAndIntervenants();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await axiosclient.get('/certifications');
      setCertifications(response.data);
    } catch (error) {
      console.error('There was an error fetching the certifications!', error);
    }
  };

  const fetchDomainesAndIntervenants = async () => {
    try {
      const response = await axiosclient.get('/certifications/create');
      setDomaines(response.data.domaines);
      setIntervenants(response.data.intervenants);
    } catch (error) {
      console.error('There was an error fetching the domaines and intervenants!', error);
    }
  };

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const handleSubmit = async (values) => {
    try {
      if (editing) {
        await axiosclient.put(`/certifications/${currentId}`, values);
        message.success('Certification mise à jour avec succès.');
      } else {
        await axiosclient.post('/certifications', values);
        message.success('Certification créée avec succès.');
      }
      form.resetFields();
      setEditing(false);
      setCurrentId(null);
      fetchCertifications();
    } catch (error) {
      message.error('Il y a eu une erreur.');
      console.error('There was an error submitting the form!', error);
    }
  };

  const handleEdit = (certification) => {
    form.setFieldsValue(certification);
    setEditing(true);
    setCurrentId(certification.id);
  };

  const handleDelete = async (id) => {
    try {
      await axiosclient.delete(`/certifications/${id}`);
      message.success('Certification supprimée avec succès.');
      fetchCertifications();
    } catch (error) {
      message.error('Il y a eu une erreur.');
      console.error('There was an error deleting the certification!', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestion des Certifications</h1>
      <Form
        {...(formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null)}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
        onFinish={handleSubmit}
        style={{ maxWidth: formLayout === 'inline' ? 'none' : 600, marginBottom: '20px' }}
      >
        <Form.Item label="Form Layout" name="layout">
          <Radio.Group value={formLayout}>
            <Radio.Button value="horizontal">Horizontal</Radio.Button>
            <Radio.Button value="vertical">Vertical</Radio.Button>
            <Radio.Button value="inline">Inline</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Intitulé"
          name="intitule_certification"
          rules={[{ required: true, message: 'Veuillez entrer l\'intitulé de la certification' }]}
        >
          <Input placeholder="Entrez l'intitulé" />
        </Form.Item>
        <Form.Item
          label="Organisme"
          name="organisme_certification"
          rules={[{ required: true, message: 'Veuillez entrer l\'organisme de certification' }]}
        >
          <Input placeholder="Entrez l'organisme" />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type_certification"
          rules={[{ required: true, message: 'Veuillez entrer le type de certification' }]}
        >
          <Input placeholder="Entrez le type" />
        </Form.Item>
        <Form.Item
          label="Domaine"
          name="domaines_id"
          rules={[{ required: true, message: 'Veuillez sélectionner un domaine' }]}
        >
          <Select placeholder="Sélectionner un domaine">
            {domaines.map((domaine) => (
              <Option key={domaine.id} value={domaine.id}>
                {domaine.nom_domaine}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Intervenant"
          name="intervenants_id"
          rules={[{ required: true, message: 'Veuillez sélectionner un intervenant' }]}
        >
          <Select placeholder="Sélectionner un intervenant">
            {intervenants.map((intervenant) => (
              <Option key={intervenant.id} value={intervenant.id}>
                {intervenant.nom}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item {...(formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 } } : null)}>
          <Button type="primary" htmlType="submit">
            {editing ? 'Mettre à jour' : 'Créer'}
          </Button>
        </Form.Item>
      </Form>

      <h2>Liste des Certifications</h2>
      <List
        bordered
        dataSource={certifications}
        renderItem={(certification) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => handleEdit(certification)}>
                Éditer
              </Button>,
              <Button type="link" danger onClick={() => handleDelete(certification.id)}>
                Supprimer
              </Button>,
            ]}
          >
            {certification.intitule_certification}
          </List.Item>
        )}
      />
    </div>
  );
};

export default Certification;
