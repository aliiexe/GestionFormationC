
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
  const [intervenant,setintervenant]=useState([])
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


  useEffect(()=>{
    getintervenants()
  },[])
  const[error,seterror]=useState()

  const createintervenant=()=>{
    if(!intervenant){
seterror('all fields are required')

    }else{
      seterror()
axiosclient.post('/intervenant')
.then((a)=>{if(a.status==200 || a.status==204){
  setadress('')

  getintervenants()
}})
  }}
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
     fields={[{name:"name",value:"aa"}]}
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
 
          <Form.Item label="Name" name={"name"} rules={[{required:true,message:"please fill needed field"}]}>
          <Input   required={true}/>
        </Form.Item>
     
        <Form.Item label="Adress" name={"adress"}  rules={[{required:true,message:"please fill needed field"}]} onChange={(e)=>{setadress(e.target.value)}}>
          <TextArea rows={4}  required={true}/>
        </Form.Item> 
        {error?<Form.Item > <div style={{color:"red"}}>{error}</div>
        </Form.Item>:null}

      
        <Form.Item >
          <Button onClick={()=>{update?confirmupdate():createintervenant()}}>Confirm</Button>
        </Form.Item>

      </Form>

    </>
)
}