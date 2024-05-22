
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
    await axiosclient.get('/intervenant').then((a)=>setintervenants(a.data))
  }
  const confirmupdate=async()=>{
    await axiosclient.put('/intervenant/'+update.id).then((a)=>{})
    getintervenants()
    setupdate()
    setadress('')


  }
const useEffect(() => {
 axiosclient
},[]);
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

seterror('all fields are required')


      seterror()
axiosclient.post('/intervenant',{})
.then()
  }
  const handleChange=(e,isselect)=>{
    if(isselect==true){
      setintervenant({...intervenant,"datenaissance":e})
      console.log(intervenant)
    }else{
    setintervenant({...intervenant,[e.target.name]:e.target.value})
    console.log(e.target.name,"   ",e.target.value)
    console.log(intervenant)}
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
          <Form.Item label="nom" name={"nom"} rules={[{required:true,message:"please fill needed field"}]}>
          <Input   required={true} name="nom" onChange={(e)=>handleChange(e)}/>
        </Form.Item>
        <Form.Item label="date naissance"  rules={[{required:true,message:"please fill needed field"}]}>
          <Input name={"datenaissance"}  required={true} onChange={(e)=>handleChange(e)}/>
        </Form.Item>
        <Form.Item label="DISPLOME" >
          <Select name={'date_naissance'} onSelect={(e)=>handleChange(e,true)}>
          <Select.Option name="date_naissance" value="aaa" >AAAA</Select.Option>
          <Select.Option name="date_naissance" value="nn" >bbb</Select.Option>
          </Select>
        </Form.Item>


        <Form.Item label="type_intervenant"  rules={[{required:true,message:"please fill needed field"}]}>
          <Input  name={"type_intervenant"} required={true} onChange={(e)=>handleChange(e)}/>
        </Form.Item>
        {error?<Form.Item > <div style={{color:"red"}}>{error}</div>
        </Form.Item>:null}


        <Form.Item >
          <Button onClick={()=>{createintervenant()}}>Confirm</Button>
        </Form.Item>

      </Form>

    </>
)
}
