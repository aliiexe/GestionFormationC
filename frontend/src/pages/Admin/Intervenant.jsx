
import { useState,useEffect } from "react";
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
  } from 'antd';
  import { Space, Table, Tag } from 'antd';
  import { PlusOutlined,DeleteOutlined ,EditOutlined  } from '@ant-design/icons';
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  import { Modal } from 'antd';
  import { axiosclient } from "../../api/axiosClient";
  import Item from "antd/es/list/Item";

export default function Intervenant(){
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [intervenant,setintervenant]=useState({})
  const [intervenants,setintervenants]=useState([])
  const[updintervenant,setupdaintevenant]=useState()
  const[update,setupdate]=useState()

   const columns = [
    {
      title: 'Name',
      dataIndex: 'nom',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Address',
      dataIndex: 'adresse',
      key: 'address',
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a><EditOutlined onClick={()=>handleUpdate(record)}/></a>
          <a><DeleteOutlined onClick={()=>handleDelete(record.id)}/></a>
        </Space>)
    },
  ];

  const diplomes = [
    { name: "" },
    { name: "Baccalauréat Général" },
    { name: "Baccalauréat Technique" },
    { name: "Baccalauréat Professionnel" },
    { name: "Diplôme de Technicien (DT)" },
    { name: "Diplôme de Technicien Spécialisé (DTS)" },
    { name: "Diplôme Universitaire de Technologie (DUT)" },
    { name: "Brevet de Technicien Supérieur (BTS)" },
    { name: "Diplôme d'Études Universitaires Générales (DEUG)" },
    { name: "Diplôme de Licence (Licence Fondamentale)" },
    { name: "Licence Professionnelle" },
    { name: "Master" },
    { name: "Master Spécialisé" },
    { name: "Diplôme d'Ingénieur d'État" },
    { name: "Doctorat" },
    { name: "Doctorat d'État" },
  ];

  const handleChange=(e,isselect)=>{
    if(isselect==true){
      setintervenant({...intervenant,"datenaissance":e})
      console.log(intervenant)
    }else{
    setintervenant({...intervenant,[e.target.name]:e.target.value})
    console.log(e.target.name,"   ",e.target.value)
    console.log(intervenant)}
  }

  const handleSubmit=()=>{
      axiosclient.post('/intervenant',intervenant).then((res)=>{
        console.log(res)
        setintervenant({})
        setintervenants([...intervenants])
      }).catch((err)=>{
        console.log(err)
      })
  }
  
return(
    <>
     <>
     <Modal
        open={isModalOpen2}
        title="Title"
        onOk={()=>{setIsModalOpen2(false)}}
        onCancel={()=>{setIsModalOpen2(false)}}
        footer={(_, { OkBtn}) => (
          <>
            <OkBtn />
          </>
        )}>
        <p>intervenant has been deleted</p>
      </Modal>
     
    </>
    <Form.Item>
<h3 style={{fontSize:"20px","marginLeft":"13px",borderBottom:"2px solid purple",  maxWidth: 300,}}>intervenantS </h3>
</Form.Item>
    <Table columns={columns} dataSource={intervenants}  pagination={{ defaultPageSize: 6}}/>
    <Form

        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"

        style={{
          maxWidth: 600,
        }}
      >
    
          <h3 style={{fontSize:"20px","marginLeft":"13px",maxWidth:300,borderBottom:"2px solid purple",marginBottom:"40px"}}>{update?"UPDATE":"ADD"} intervenant</h3>
          <Form.Item label="matricule" name={"matricule"} rules={[{required:true,message:"please fill needed field"}]}>
          <Input required={true} name="matricule" onChange={(e)=>handleChange(e)}/>
        </Form.Item>
          <Form.Item label="nom" name={"nom"} rules={[{required:true,message:"please fill needed field"}]}>
          <Input required={true} name="nom" onChange={(e)=>handleChange(e)}/>
        </Form.Item>
        <Form.Item label="date naissance"  rules={[{required:true,message:"please fill needed field"}]}>
          <Input name={"datenaissance"} type="date"  required={true} onChange={(e)=>handleChange(e)}/>
        </Form.Item>
        <Form.Item label="Diplome" >
          <Select name={'diplome'} onSelect={(e)=>handleChange(e,true)}>
            {diplomes.map((item)=>(
              <Select.Option value={item.name} key={item.id}>{item.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
         <Form.Item label="Type intervenant"  rules={[{required:true,message:"please fill needed field"}]}>
          <Input name={'typeintervenant'} required={true} onChange={(e)=>handleChange(e)}/>
        </Form.Item>
        <Form.Item >
          <Button onClick={()=>{handleSubmit()}}>Confirm</Button>
        </Form.Item>
      </Form>

    </>
)
}