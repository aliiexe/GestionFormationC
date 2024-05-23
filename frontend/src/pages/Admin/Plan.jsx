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
import { set } from "react-hook-form";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function Plan() {
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [plan, setPlan] = useState({});
    const [plans, setPlans] = useState([]);
    const [update, setUpdate] = useState();
    const [error, setError] = useState();
    const [image, setImage] = useState();
    const [theme, setTheme] = useState();
    const [themes, setThemes] = useState();
    const [nbParticipants, setNbParticipants] = useState();
    const [etablissement, seEtablissement] = useState();
    const [etablissements, seEtablissements] = useState();
    const [nbJours, setNbJours]= useState();
    const [coutPrevisionel, setCoutPrevisionel] = useState();
    const [description, setDescription] = useState();
    const [updPlan, setUpdatePlan] = useState();
    const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return Array.isArray(e?.fileList) ? e?.fileList : [];
};

    const deleteFormation = async (id) => {
        await axiosclient.delete('formation/' + id).then(() => {
            getPlans();
            setIsModalOpen2(true);
        });
    };

    const getThemes = async () => {
        await axiosclient.get('/formation').then((response) => {
            setThemes(response.data);
            console.log(response.data);
        });
    };

    const getEtablissements = async () => {
        await axiosclient.get('/etablissement').then((response) => {
            seEtablissements(response.data);
            console.log(response.data);
        });
    }

    const getPlans = async () => {
        await axiosclient.get('/plan').then((response) => {
            setPlans(response.data);
        }
        );
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
        formData.append('id', updPlan.id);
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
        setUpdatePlan(record);
        setOpenEdit(true);
    };

    const handleCreateSelectChange = (value, field) => {
        setPlan({ ...plan, [field]: value });
      };

    // 'themes_id',
    // 'etablissements_id',
    // 'exercice',
    // 'nbjours',
    // 'image',
    // 'description',
    // 'nbparticipants',
    // 'cout_previsionel',
    // 'status',

    const createFormation = async () => {
        const formData = new FormData();
        formData.append('themes_id', theme);
        formData.append('etablissements_id', etablissement);
        formData.append('nbjours', nbJours);       
        formData.append('description', description);       
        formData.append('nbparticipants', nbParticipants);       
        formData.append('cout_previsionel', coutPrevisionel);       
        formData.append('image', image);
        await axiosclient.post('/plan', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            console.log(response.data);
            
        }).catch((error) => {
            console.error(error);
            setError(error.message);
        });
    };

    useEffect(() => {
        getPlans();
        getThemes();
        getEtablissements();
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
            {/* <Modal
            open={openEdit}
            title="Modifier intervenant"
            onOk={(e)=>console.log(e)}
            onCancel={() => setOpenEdit(false)}
      
            footer={null}>
            <div style={{ padding: "10px" }}>
              <Form onFinish={(values)=>sendupdate(values)}
                form={form}
                fields={[
                  { name: "intitule_theme", value: updPlan?.intitule_theme },
                  { name: "duree_formation", value: updPlan?.duree_formation },
                  { name: "description", value: updPlan?.description },
                ]}
                layout="horizontal"
              >
                    <Form.Item label="intitule_theme" name="intitule_theme">
                        <Select name="intitule_theme" onSelect={(e)=>setTheme(e.target.value)}>
                            {themes?.map((e) => (
                            <Select.Option value={e.id} key={e.id}>{e.intitule_theme}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="etablissements_id" name="etablissements_id">
                        <Select name="etablissements_id" onSelect={(e)=>setTheme(e.target.value)}>
                            {etablissements?.map((e) => (
                            <Select.Option value={e.id} key={e.id}>{e.nom_efp}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="nbjours" name={"nbjours"} rules={[{ required: true, message: "please fill needed field" }]}>
                        <Input required={true} type="number" name="nbjours" onChange={(e)=>setNbJours(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="cout_previsionel" name={"cout_previsionel"} rules={[{ required: true, message: "please fill needed field" }]}>
                        <Input required={true} type="number" name="cout_previsionel" onChange={(e)=>setCoutPrevisionel(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="description" name={"description"} rules={[{ required: true, message: "please fill needed field" }]}>
                        <Input required={true} name="description" onChange={(e)=>setDescription(e.target.value)} />
                    </Form.Item>
                    <Form.Item >
                        <img style={{"width":"50%"}} src={"images/"+updPlan?.image} alt="" />
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
      </Modal> */}

            <Form.Item>
                <h3 style={{ fontSize: "20px", marginLeft: "13px", borderBottom: "2px solid green", maxWidth: 300, }}>Formations </h3>
            </Form.Item>
            <Table columns={columns} dataSource={plans} pagination={{ defaultPageSize: 6 }} />
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >
                <h3 style={{ fontSize: "20px", marginLeft: "13px", maxWidth: 300, borderBottom: "2px solid green", marginBottom: "40px" }}>App plan</h3>
                <Form.Item label="themes_id" name="themes_id"  onSelect={(value)=>handleCreateSelectChange(value,"themes_id")}>
                    <Select name="themes_id">
                        {themes?.map((e) => (
                        <Select.Option value={e.id} key={e.id}>{e.intitule_theme}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="etablissements_id" name="etablissements_id" onSelect={(value)=>seEtablissement(value)}>
                    <Select name="etablissements_id" >
                        {etablissements?.map((e) => (
                        <Select.Option value={e.id} key={e.id}>{e.nom_efp}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="nbjours" name={"nbjours"} rules={[{ required: true, message: "please fill needed field" }]}>
                    <Input required={true} type="number" name="nbjours" onChange={(e)=>setNbJours(e.target.value)} />
                </Form.Item>
                <Form.Item label="cout_previsionel" name={"cout_previsionel"} rules={[{ required: true, message: "please fill needed field" }]}>
                    <Input required={true} type="number" name="cout_previsionel" onChange={(e)=>setNbParticipants(e.target.value)} />
                </Form.Item>
                <Form.Item label="description" name={"description"} rules={[{ required: true, message: "please fill needed field" }]}>
                    <Input required={true} name="description" onChange={(e)=>setDescription(e.target.value)} />
                </Form.Item>
                <Form.Item label="nbParticipants" name={"nbParticipants"} rules={[{ required: true, message: "please fill needed field" }]}>
                    <Input required={true} name="nbParticipants" onChange={(e)=>setDescription(e.target.value)} />
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
