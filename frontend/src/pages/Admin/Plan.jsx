import { useState, useEffect } from "react";
import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
    Modal,
    Space,
    Table,
    Tag
} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { axiosclient } from "../../api/axiosClient";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function Intervenant() {
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [plan, sePlan] = useState({});
    const [plans, setPlans] = useState([]);
    const [update, setUpdate] = useState();
    const [error, setError] = useState();
    const [image, setImage] = useState();
    const [theme, setTheme] = useState();
    const [etablissement, seEtablissement] = useState();
    const [nbJours, setNbJours]= useState();
    const [coutPrevisionel, setCoutPrevisionel] = useState();
    const [description, setDescription] = useState();
    const [updFormation, setUpdateFormation] = useState();

    const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return Array.isArray(e?.fileList) ? e?.fileList : [];
};

    const deleteFormation = async (id) => {
        await axiosclient.delete('formation/' + id).then(() => {
            getFormations();
            setIsModalOpen2(true);
        });
    };

    const columns = [
        {
            title: 'Intitule',
            key: 'name',
            render: (text) => <a>{text.intitule_theme}</a>,
        },
        {
            title: 'Description',
            key: 'name',
            render: (text) => <a>{text.description}</a>,
        },
        {
            title: 'Duree formation',
            key: 'name',
            render: (text) => <a>{text.duree_formation}</a>,
        },
        {
            title: 'Image',
            key: 'name',
            render: (img) => <img style={{"width":"100px"}} src={"images/"+img.image}></img>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a><EditOutlined onClick={() => updateFormation(record)} /></a>
                    <a><DeleteOutlined onClick={() => deleteFormation(record.id)} /></a>
                </Space>)
        },
    ];

    const [openEdit, setOpenEdit] = useState(false);
    const [form] = Form.useForm();

    

    const sendupdate=(values)=>{
      console.log(values)
      const formData = new FormData();
        formData.append('id', updFormation.id);
        formData.append('intitule_theme', values.intitule_theme);
        formData.append('duree_formation', values.duree_formation);
        formData.append('description', values.description);       
        formData.append('image', values.image);
        axiosclient.post('/updateImage',formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
        },
        }).then((a)=>{
          console.log(a.data);
          setOpenEdit(false);
      })
    };

    const updateFormation = (record) => {
      console.log(record);
        setUpdateFormation(record);
        setOpenEdit(true);
    };

    const createFormation = async () => {
        const formData = new FormData();
        formData.append('intitule_theme', intitule_theme);
        formData.append('duree_formation', duree_formation);
        formData.append('description', description);       
        formData.append('image', image);
        await axiosclient.post('/formation', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            console.log(response.data);
            getFormations();
        }).catch((error) => {
            console.error(error);
            setError(error.message);
        });
    };

    const getFormations = async () => {
        await axiosclient.get('/formation').then((response) => {
            setFormations(response.data);
            console.log(response.data);
        });
    };

    const handleChange = (e) => {
        setFormation({ ...formation, [e.target.name]: e.target.value });
    };

    

    useEffect(() => {
        getFormations();
    }, []);

    return (
        <>
            <Modal
                open={isModalOpen2}
                title="Title"
                onOk={() => setIsModalOpen2(false)}
                onCancel={() => setIsModalOpen2(false)}
                footer={(_, { OkBtn }) => (
                    <>
                        <OkBtn />
                    </>
                )}
            >
                <p>Image has been deleted</p>
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
                  { name: "intitule_theme", value: updFormation?.intitule_theme },
                  { name: "duree_formation", value: updFormation?.duree_formation },
                  { name: "description", value: updFormation?.description },
                ]}
                layout="horizontal"
              >
                    <Form.Item label="intitule_theme" name={"intitule_theme"} rules={[{ required: true, message: "please fill needed field" }]}>
                        <Input required={true} name="intitule_theme" onChange={(e)=>setIntitule_theme(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="duree_formation" name={"duree_formation"} rules={[{ required: true, message: "please fill needed field" }]}>
                        <Input required={true} type="number" name="duree_formation" onChange={(e)=>setDuree_formation(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="description" name={"description"} rules={[{ required: true, message: "please fill needed field" }]}>
                        <Input required={true} name="description" onChange={(e)=>setDescription(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="description" name={"description"} rules={[{ required: true, message: "please fill needed field" }]}>
                        <Input required={true} name="description" onChange={(e)=>setDescription(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="description" name={"description"} rules={[{ required: true, message: "please fill needed field" }]}>
                        <Input required={true} name="description" onChange={(e)=>setDescription(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="description" name={"description"} rules={[{ required: true, message: "please fill needed field" }]}>
                        <Input required={true} name="description" onChange={(e)=>setDescription(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="description" name={"description"} rules={[{ required: true, message: "please fill needed field" }]}>
                        <Input required={true} name="description" onChange={(e)=>setDescription(e.target.value)} />
                    </Form.Item>
                    <Form.Item >
                        <img style={{"width":"50%"}} src={"images/"+updFormation?.image} alt="" />
                    </Form.Item>
                    <Form.Item 
                        label="Image" 
                        valuePropName="fileList" 
                        getValueFromEvent={normFile}  
                        name={"image"} 
                        onChange={e =>{setImage(e.target.files[0])}}
                      > 
                                <Upload beforeUpload={() => false}  maxCount={1} id="img"  listType="picture-card">
                                  <button
                                    style={{
                                      border: 0,
                                      background: 'none',
                                    }}
                                    type="button"
                                  >
                                    <PlusOutlined />
                                    <div
                                      style={{
                                        marginTop: 8,
                                      }}
                                    >
                                      Upload
                                    </div>
                                  </button>
                                </Upload>
                      </Form.Item>
                <Form.Item style={{textAlign:"right"}}>
              <Button type="primary" htmlType="submit">Confirm update</Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

            <Form.Item>
                <h3 style={{ fontSize: "20px", marginLeft: "13px", borderBottom: "2px solid green", maxWidth: 300, }}>Formations </h3>
            </Form.Item>
            <Table columns={columns} dataSource={formations} pagination={{ defaultPageSize: 6 }} />
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >
                <h3 style={{ fontSize: "20px", marginLeft: "13px", maxWidth: 300, borderBottom: "2px solid green", marginBottom: "40px" }}>{update ? "UPDATE" : "ADD"} intervenant</h3>
                <Form.Item label="intitule_theme" name={"intitule_theme"} rules={[{ required: true, message: "please fill needed field" }]}>
                    <Input required={true} name="intitule_theme" onChange={(e)=>setIntitule_theme(e.target.value)} />
                </Form.Item>
                <Form.Item label="duree_formation" name={"duree_formation"} rules={[{ required: true, message: "please fill needed field" }]}>
                    <Input required={true} type="number" name="duree_formation" onChange={(e)=>setDuree_formation(e.target.value)} />
                </Form.Item>
                <Form.Item label="description" name={"description"} rules={[{ required: true, message: "please fill needed field" }]}>
                    <Input required={true} name="description" onChange={(e)=>setDescription(e.target.value)} />
                </Form.Item>
                <Form.Item 
                    label="Image" 
                    valuePropName="fileList" 
                    getValueFromEvent={normFile}  
                    name={"image"} 
                    onChange={e =>{setImage(e.target.files[0])}}
                  > 
                            <Upload beforeUpload={() => false}  maxCount={1} id="img"  listType="picture-card">
                              <button
                                style={{
                                  border: 0,
                                  background: 'none',
                                }}
                                type="button"
                              >
                                <PlusOutlined />
                                <div
                                  style={{
                                    marginTop: 8,
                                  }}
                                >
                                  Upload
                                </div>
                              </button>
                            </Upload>
                  </Form.Item>
                <Form.Item >
                    <Button onClick={createFormation}>Ajouter</Button>
                </Form.Item>
            </Form>
        </>
    );
}
