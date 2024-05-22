
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

export default function Intervenant(){
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [intervenant,setintervenant]=useState({})
  const [intervenants,setintervenants]=useState([])
  const[updintervenant,setupdaintevenant]=useState()
  const[update,setupdate]=useState()
  const deleteintervenant=async(id)=>{
  await axiosclient.delete('intervenants/'+id).then(()=>{
    getintervenants()
    setIsModalOpen2(true)
  }
)
  }
    const updateintervenant=(id)=>{
      setupdaintevenant(id)
      console.log(id)
    }
    const getintervenants=async()=>{
      await axiosclient.get('/intervenant').then((a)=>{setintervenants(a.data); console.log(a.data)})
    }
    const confirmupdate=async()=>{
      await axiosclient.put('/intervenant/'+update.id).then((a)=>{})
      getintervenants()
      setupdate()
    }

   const columns = [
    {
      title: 'Nom complet',
      key: 'name',
      render: (text) => <a>{text.nom}</a>,
    },
    {
      title: 'Matricule',
      key: 'name',
      render: (text) => <a>{text.matricule}</a>,
    },
    {
      title: 'Date de naissance',
      key: 'name',
      render: (text) => <a>{text.datenaissance}</a>,
    },
    {
      title: 'Type intervenant',
      key: 'name',
      render: (text) => <a>{text.typeintervenant}</a>,
    },
    {
      title: 'Etablissement',
      key: 'name',
      render: (text) => <a>{text.etablissement.nom_efp}</a>,
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a><EditOutlined onClick={()=>updateintervenant(record)}/></a>
          <a><DeleteOutlined onClick={()=>deleteintervenant(record.id)}/></a>
        </Space>)

    },
  ];
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

const onChange=((e)=>{

})
  useEffect(()=>{
    getintervenants()
  },[])
  const[error,seterror]=useState()

  const createintervenant=()=>{
 console.log(intervenant)
seterror('all fields are required')


      seterror()
axiosclient.post('/intervenant',intervenant)
.then(e=>console.log(e))
  }
  const handleChange=(e,isselect,type)=>{
    if(isselect==true){
      if(type=="type"){
        setintervenant({...intervenant,"typeintervenant":e})
        console.log(intervenant)
      }else if(type=="etablissement"){
        setintervenant({...intervenant,"etablissement_id":e})
        console.log(intervenant)
      }
  
    }else{
    setintervenant({...intervenant,[e.target.name]:e.target.value})
    console.log(e.target.name,"   ",e.target.value)
    console.log(intervenant)}
  }
  const[etablissement,setetablissement]=useState([])
  useEffect(()=>{
axiosclient.get('/etablissement').then((a)=>{
setetablissement(a.data)
})
  },[])
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
];
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
        )}
      >
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
          <Input   required={true} name="matricule" onChange={(e)=>handleChange(e)}/>
        </Form.Item>
        <Form.Item label="email" name={"email"} rules={[{required:true,message:"please fill needed field"}]}>
          <Input   required={true} name="email" onChange={(e)=>handleChange(e)}/>
        </Form.Item>
        <Form.Item label="password" name={"password"} rules={[{required:true,message:"please fill needed field"}]}>
          <Input   required={true} name="password" onChange={(e)=>handleChange(e)}/>
        </Form.Item>
          <Form.Item label="nom" name={"nom"} rules={[{required:true,message:"please fill needed field"}]}>
          <Input   required={true} name="nom" onChange={(e)=>handleChange(e)}/>
        </Form.Item>
        <Form.Item label="date naissance"  rules={[{required:true,message:"please fill needed field"}]}>
          <Input name={"datenaissance"} type="date" required={true} onChange={(e)=>handleChange(e)}/>
        </Form.Item>
        <Form.Item label="etablissement">
          <Select name={'etablisssement'} onSelect={(e)=>handleChange(e,true,"etablissement")}>
          {etablissement.map((e)=>{return(
              <Select.Option name="etablissement" value={e.id} key={e.id} >{e.nom_efp}</Select.Option>
          )})}
          </Select>
        </Form.Item>   
        <Form.Item label="type intervenant">
          <Select name={'type'} onSelect={(e)=>handleChange(e,true,"type")}>
          <Select.Option name="typeintervenant" value="interne" >interne</Select.Option>
          <Select.Option name="typeintervenant" value="externe" >externe</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="intitule diplome"  rules={[{required:true,message:"please fill needed field"}]}>
          <Input name={"intitule_diplome"}  required={true} onChange={(e)=>handleChange(e)}/>
        </Form.Item>
        <Form.Item label="type diplome"  rules={[{required:true,message:"please fill needed field"}]}>
          <Input name={"typediplome"}  required={true} onChange={(e)=>handleChange(e)}/>
        </Form.Item>
        <Form.Item label="specialite diplome"  rules={[{required:true,message:"please fill needed field"}]}>
          <Input name={"specialite_diplome"}  required={true} onChange={(e)=>handleChange(e)}/>
        </Form.Item>
        <Form.Item >
          <Button onClick={()=>{createintervenant()}}>Confirm</Button>
        </Form.Item>
      </Form>
    </>
)
}