import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Radio, Select, List, message } from 'antd';
import { axiosclient } from '../../api/axiosClient'

const { Option } = Select;

const Competences = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [competences, setCompetences] = useState([]);
  const [intervenants, setIntervenants] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchCompetences();
    fetchIntervenants();
  }, []);

  const fetchCompetences = async () => {
    try {
      const response = await axiosclient.get('/competences');
      setCompetences(response.data);
    } catch (error) {
      console.error('There was an error fetching the competences!', error);
    }
  };

  const fetchIntervenants = async () => {
    try {
      const response = await axiosclient.get('/competences/create');
      setIntervenants(response.data.intervenants);
    } catch (error) {
      console.error('There was an error fetching the intervenants!', error);
    }
  };

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const handleSubmit = async (values) => {
    try {
      if (editing) {
        await axiosclient.put(`/competences/${currentId}`, values);
        message.success('Compétence mise à jour avec succès.');
      } else {
        await axiosclient.post('/competences', values);
        message.success('Compétence créée avec succès.');
      }
      form.resetFields();
      setEditing(false);
      setCurrentId(null);
      fetchCompetences();
    } catch (error) {
      message.error('Il y a eu une erreur.');
      console.error('There was an error submitting the form!', error);
    }
  };

  const handleEdit = (competence) => {
    form.setFieldsValue(competence);
    setEditing(true);
    setCurrentId(competence.id);
  };

  const handleDelete = async (id) => {
    try {
      await axiosclient.delete(`/competences/${id}`);
      message.success('Compétence supprimée avec succès.');
      fetchCompetences();
    } catch (error) {
      message.error('Il y a eu une erreur.');
      console.error('There was an error deleting the competence!', error);
    }
  };
  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestion des Compétences</h1>
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
        <Form.Item label="Libellé" name="libelle" rules={[{ required: true, message: 'Veuillez entrer le libellé' }]}>
          <Input placeholder="Entrez le libellé" />
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

      <h2>Liste des Compétences</h2>
      <List
        bordered
        dataSource={competences}
        renderItem={(competence) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => handleEdit(competence)}>
                Éditer
              </Button>,
              <Button type="link" danger onClick={() => handleDelete(competence.id)}>
                Supprimer
              </Button>,
            ]}
          >
            {competence.libelle}
          </List.Item>
        )}
      />
    </div>
  );
};

export default Competences;
