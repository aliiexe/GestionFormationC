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

export default function Plan() {
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [plan, setPlan] = useState({});
    const [plans, setPlans] = useState([]);
    const [update, setUpdate] = useState();
    const [error, setError] = useState();
    const [image, setImage] = useState();
    const [theme, setTheme] = useState();
    const [themes, setThemes] = useState([]);
    const [nbParticipants, setNbParticipants] = useState();
    const [etablissement, setEtablissement] = useState();
    const [etablissements, setEtablissements] = useState([]);
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
            setEtablissements(response.data);
            console.log(response.data);
        });
    };

    const getPlans = async () => {
        await axiosclient.get('/plan').then((response) => {
            setPlans(response.data);
        });
    };

    const columns = [
        {
            title: 'Intitule',
            key: 'intitule_theme',
            dataIndex: 'intitule_theme',
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
        },
        {
            title: 'Duree formation',
            key: 'duree_formation',
            dataIndex: 'duree_formation',
        },
        {
            title: 'Image',
            key: 'image',
            render: (record) => <img style={{ width: "100px" }} src={"images/" + record.image} alt="Formation" />
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined onClick={() => updateFormation(record)} />
                    <DeleteOutlined onClick={() => deleteFormation(record.id)} />
                </Space>
            )
        },
    ];

    const [openEdit, setOpenEdit] = useState(false);
    const [form] = Form.useForm();

    const sendUpdate = (values) => {
        console.log(values);
        const formData = new FormData();
        formData.append('id', updPlan.id);
        formData.append('intitule_theme', values.intitule_theme);
        formData.append('duree_formation', values.duree_formation);
        formData.append('description', values.description);
        if (values.image) {
            formData.append('image', values.image.file);
        }
        axiosclient.post('/updateImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            console.log(response.data);
            setOpenEdit(false);
            getPlans();
        }).catch((error) => {
            console.error(error);
        });
    };

    const updateFormation = (record) => {
        console.log(record);
        setUpdatePlan(record);
        setOpenEdit(true);
        form.setFieldsValue({
            intitule_theme: record.intitule_theme,
            duree_formation: record.duree_formation,
            description: record.description,
        });
    };

    const handleCreateSelectChange = (value, field) => {
        setPlan({ ...plan, [field]: value });
    };

    const createFormation = async () => {
        console.log(image);
        const formData = new FormData();
        formData.append('themes_id', theme);
        formData.append('etablissements_id', etablissement);
        formData.append('nbjours', nbJours);
        formData.append('description', description);
        formData.append('nbparticipants', nbParticipants);
        formData.append('cout_previsionel', coutPrevisionel);
        formData.append('image', image.originFileObj);

        await axiosclient.post('/plan', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            console.log(response.data);
            getPlans();
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
                title="Notification"
                onOk={() => setIsModalOpen2(false)}
                onCancel={() => setIsModalOpen2(false)}
                footer={null}
            >
                <p>Image has been deleted</p>
            </Modal>
            <Modal
                open={openEdit}
                title="Modifier Formation"
                onCancel={() => setOpenEdit(false)}
                footer={null}
            >
                <div style={{ padding: "10px" }}>
                    <Form
                        onFinish={sendUpdate}
                        form={form}
                        layout="horizontal"
                    >
                        <Form.Item label="Intitulé" name="intitule_theme" rules={[{ required: true, message: "Veuillez remplir ce champ" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Durée de formation" name="duree_formation" rules={[{ required: true, message: "Veuillez remplir ce champ" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Description" name="description" rules={[{ required: true, message: "Veuillez remplir ce champ" }]}>
                            <TextArea />
                        </Form.Item>
                        <Form.Item label="Image">
                            <img style={{ width: "50%" }} src={"images/" + updPlan?.image} alt="" />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            name="image"
                        >
                            <Upload beforeUpload={() => false} maxCount={1} listType="picture-card">
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                        <Form.Item style={{ textAlign: "right" }}>
                            <Button type="primary" htmlType="submit">Confirmer la mise à jour</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>

            <Form.Item>
                <h3 style={{ fontSize: "20px", marginLeft: "13px", borderBottom: "2px solid green", maxWidth: 300 }}>Formations</h3>
            </Form.Item>
            <Table columns={columns} dataSource={plans} pagination={{ defaultPageSize: 6 }} />

            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >
                <h3 style={{ fontSize: "20px", marginLeft: "13px", maxWidth: 300, borderBottom: "2px solid green", marginBottom: "40px" }}>App plan</h3>
                <Form.Item label="Thème" name="themes_id" rules={[{ required: true, message: "Veuillez sélectionner un thème" }]}>
                    <Select onChange={(value) => setTheme(value)}>
                        {themes?.map((e) => (
                            <Select.Option value={e.id} key={e.id}>{e.intitule_theme}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Établissement" name="etablissements_id" rules={[{ required: true, message: "Veuillez sélectionner un établissement" }]}>
                    <Select onChange={(value) => setEtablissement(value)}>
                        {etablissements?.map((e) => (
                            <Select.Option value={e.id} key={e.id}>{e.nom_efp}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Nombre de jours" name="nbjours" rules={[{ required: true, message: "Veuillez remplir ce champ" }]}>
                    <Input onChange={(e) => setNbJours(e.target.value)} />
                </Form.Item>
                <Form.Item label="Description" name="description" rules={[{ required: true, message: "Veuillez remplir ce champ" }]}>
                    <TextArea onChange={(e) => setDescription(e.target.value)} />
                </Form.Item>
                <Form.Item label="Nombre de participants" name="nbparticipants" rules={[{ required: true, message: "Veuillez remplir ce champ" }]}>
                    <Input onChange={(e) => setNbParticipants(e.target.value)} />
                </Form.Item>
                <Form.Item label="Coût prévisionnel" name="cout_previsionel" rules={[{ required: true, message: "Veuillez remplir ce champ" }]}>
                    <Input onChange={(e) => setCoutPrevisionel(e.target.value)} />
                </Form.Item>
                <Form.Item label="Image" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload beforeUpload={() => false} maxCount={1} listType="picture-card" onChange={(info) => setImage(info.fileList[0])}>
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item style={{ textAlign: "right" }}>
                    <Button type="primary" onClick={createFormation}>Ajouter la formation</Button>
                </Form.Item>
            </Form>
        </>
    );
}
