import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Modal,
  Table,
  Space
} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { axiosclient } from "../../api/axiosClient";

export default function Intervenant() {
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [intervenant, setIntervenant] = useState({});
  const [intervenants, setIntervenants] = useState([]);
  const [updIntervenant, setUpdIntervenant] = useState({});
  const [update, setUpdate] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [etablissement, setEtablissement] = useState([]);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const deleteIntervenant = async (id) => {
    await axiosclient.delete('intervenant/' + id).then(() => {
      getIntervenants();
      setIsModalOpen2(true);
    });
  };

  const updateIntervenant = (record) => {
    setOpenEdit(true);
    setUpdIntervenant(record);
  };

  const getIntervenants = async () => {
    await axiosclient.get('/intervenant').then((response) => {
      setIntervenants(response.data);
    });
  };

  const confirmUpdate = async () => {
    await axiosclient.put('/intervenant/' + updIntervenant.id, updIntervenant).then(() => {
      getIntervenants();
      setOpenEdit(false);
    });
  };

  const columns = [
    {
      title: 'Nom complet',
      key: 'name',
      render: (text) => <a>{text.nom}</a>,
    },
    {
      title: 'Matricule',
      key: 'name',
      render: (text) => <a>{text.typeintervenant}</a>,
    },
    {
      title: 'Etablissement',
      key: 'name',
      render: (text) => <a>{text.etablissement?.nom_efp}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a><EditOutlined onClick={() => updateIntervenant(record)} /></a>
          <a><DeleteOutlined onClick={() => deleteIntervenant(record.id)} /></a>
        </Space>
      )
    }
  ];

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdIntervenant({ ...updIntervenant, [name]: value });
    console.log(updIntervenant)
  };

  const handleSelectChange = (value, field) => {
    setUpdIntervenant({ ...updIntervenant, [field]: value });
  };

  useEffect(() => {
    getIntervenants();
    axiosclient.get('/etablissement').then((response) => {
      setEtablissement(response.data);
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue(updIntervenant);
  }, [updIntervenant]);

  const createIntervenant = () => {
    console.log(intervenant)
    axiosclient.post('/intervenant', intervenant).then(() => {
      getIntervenants();
      form2.resetFields()
    });
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setIntervenant({ ...intervenant, [name]: value });
  };

  const handleCreateSelectChange = (value, field) => {
    setIntervenant({ ...intervenant, [field]: value });
  };
const sendupdate=(values)=>{
  console.log(values)
  axiosclient.put('/intervenant/'+updIntervenant.id,values).then((a)=>{
setOpenEdit(false);
getIntervenants();
  })
};
  return (
    <>
      <Modal
        open={isModalOpen2}
        title="Title"
        onOk={() => setIsModalOpen2(false)}
        onCancel={() => setIsModalOpen2(false)}
        footer={null}
      >
        <p>Intervenant has been deleted</p>
      </Modal>
      <Modal
        open={openEdit}
        title="Modifier intervenant"
        onOk={(e)=>console.log(e)}
        onCancel={() => setOpenEdit(false)}
  
        footer={null}>
        <div style={{ padding: "10px" }}>
          <Form onFinish={(values)=>sendupdate(values)}
            form={form}
            fields={[
              { name: "matricule", value: updIntervenant.matricule },
              { name: "nom", value: updIntervenant.nom },
              { name: "datenaissance", value: updIntervenant.datenaissance },
              { name: "etablissements_id", value: updIntervenant.etablissements_id },
              { name: "typeintervenant", value: updIntervenant.typeintervenant },
              { name: "intitule_diplome", value: updIntervenant.diplomes?.intitule_diplome },
              { name: "typediplome", value: updIntervenant.diplomes?.typediplome },
              { name: "specialite_diplome", value: updIntervenant.diplomes?.specialite_diplome }
            ]}
            layout="horizontal"
          >
            <Form.Item label="Matricule" name="matricule" rules={[{ required: true, message: "Please fill needed field" }]}>
              <Input name="matricule" onChange={handleEditChange} />
            </Form.Item>
            <Form.Item label="Nom" name="nom" rules={[{ required: true, message: "Please fill needed field" }]}>
              <Input name="nom" onChange={handleEditChange} />
            </Form.Item>
            <Form.Item label="Date Naissance" name="datenaissance" rules={[{ required: true, message: "Please fill needed field" }]}>
              <Input name="datenaissance" type="date" onChange={handleEditChange} />
            </Form.Item>
            <Form.Item label="Etablissement" name="etablissements_id">
              <Select name="etablissements_id" onSelect={(value) => handleSelectChange(value, "etablissements_id")}>
                {etablissement.map((e) => (
                  <Select.Option value={e.id} key={e.id}>{e.nom_efp}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Type Intervenant" name="typeintervenant">
              <Select name="typeintervenant" onSelect={(value) => handleSelectChange(value, "typeintervenant")}>
                <Select.Option value="interne">Interne</Select.Option>
                <Select.Option value="externe">Externe</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Intitule Diplome" name="intitule_diplome" rules={[{ required: true, message: "Please fill needed field" }]}>
              <Input name="intitule_diplome" onChange={handleEditChange} />
            </Form.Item>
            <Form.Item label="Type Diplome" name="typediplome" rules={[{ required: true, message: "Please fill needed field" }]}>
              <Input name="typediplome" onChange={handleEditChange} />
            </Form.Item>
            <Form.Item label="Specialite Diplome" name="specialite_diplome" rules={[{ required: true, message: "Please fill needed field" }]}>
              <Input name="specialite_diplome" onChange={handleEditChange} />
            </Form.Item>
            <Form.Item style={{textAlign:"right"}}>
          <Button type="primary" htmlType="submit">Confirm update</Button>
        </Form.Item>
          </Form>
        </div>
      </Modal>


      <Form.Item>
        <h3 style={{ fontSize: "20px", marginLeft: "13px", borderBottom: "2px solid green", maxWidth: 300 }}>Intervenants</h3>
      </Form.Item>
      <Table columns={columns} dataSource={intervenants} pagination={{ defaultPageSize: 6 }} />
      <Form form={form2}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <h3 style={{ fontSize: "20px", marginLeft: "13px", maxWidth: 300, borderBottom: "2px solid green", marginBottom: "40px" }}>
          {update ? "UPDATE" : "ADD"} Intervenant
        </h3>
        <Form.Item label="Matricule" name="matricule" rules={[{ required: true, message: "Please fill needed field" }]}>
          <Input required name="matricule" onChange={handleCreateChange} />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please fill needed field" }]}>
          <Input required name="email" onChange={handleCreateChange} />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please fill needed field" }]}>
          <Input required name="password" onChange={handleCreateChange} />
        </Form.Item>
        <Form.Item label="Nom" name="nom" rules={[{ required: true, message: "Please fill needed field" }]}>
          <Input required name="nom" onChange={handleCreateChange} />
        </Form.Item>
        <Form.Item label="Date Naissance" name="datenaissance" rules={[{ required: true, message: "Please fill needed field" }]}>
          <Input required name="datenaissance" type="date" onChange={handleCreateChange} />
        </Form.Item>
        <Form.Item label="Etablissement" name="etablissements_id">
          <Select name="etablissements_id" onSelect={(value) => handleCreateSelectChange(value, "etablissements_id")}>
            {etablissement.map((e) => (
              <Select.Option value={e.id} key={e.id}>{e.nom_efp}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Type Intervenant" name="typeintervenant">
          <Select name="typeintervenant" onSelect={(value) => handleCreateSelectChange(value, "typeintervenant")}>
            <Select.Option value="interne">Interne</Select.Option>
            <Select.Option value="externe">Externe</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Intitule Diplome" name="intitule_diplome" rules={[{ required: true, message: "Please fill needed field" }]}>
          <Input required name="intitule_diplome" onChange={handleCreateChange} />
        </Form.Item>
        <Form.Item label="Type Diplome" name="typediplome" rules={[{ required: true, message: "Please fill needed field" }]}>
          <Input required name="typediplome" onChange={handleCreateChange} />
        </Form.Item>
        <Form.Item label="Specialite Diplome" name="specialite_diplome" rules={[{ required: true, message: "Please fill needed field" }]}>
          <Input required name="specialite_diplome" onChange={handleCreateChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={createIntervenant}>Add Intervenant</Button>
        </Form.Item>
      </Form>
    </>
  );
}
