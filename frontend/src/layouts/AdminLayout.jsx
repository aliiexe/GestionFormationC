import { useEffect, useState } from "react"
import {Link, Outlet, useNavigate} from "react-router-dom"
import { useLocation } from "react-router-dom";

import {
    DollarOutlined,
    ShopOutlined ,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    PoweroffOutlined 
  } from '@ant-design/icons';

  import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { axiosclient } from "../api/axiosClient";
  const { Header, Content, Footer, Sider } = Layout;

export default function AdminLayout(){
    const location=useLocation()
    const navigate=useNavigate()
    useEffect(()=>{
      axiosclient.get('/api/user').then((a)=>{
        console.log(a.status)
        if(a.status!=200 && a.status !=204){
          navigate('/Login')
        }
   
          if(a.data.email !="ofppt@gmail.com"){
            navigate('/Login')
          }
        
      }).catch(err=>{
        navigate('/Login')
      })
    },[])
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    function getItem(label, key, icon, items,style) {
      return {
        key,
        icon,
        items,
        label,
        style
      };
    }
      const items = [
        getItem(),
        getItem(<Link to="/dashboard">Dashboard</Link>, '1', <PieChartOutlined style={{"paddingTop":"0px !important"}}/>),
        getItem(<Link to="/intervenant">Intervenant</Link>, '2', <TeamOutlined />),
        getItem(<Link to="/formation">Formations</Link>, '3', <ShopOutlined />),
        getItem(<Link to="/plan">Plan</Link>, '4', <DollarOutlined />),
    ];

    
    
    return(
     
        <>
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" style={{display:"flex",justifyContent:"center"}}><Link> <div style={{display:"flex",flexDirection:"column",padding:"5px",justifyContent:"center"}}><img src={"/images/ofppt-logo.png"} style={{height:"5%", marginTop:"20px"}}></img><span style={{color:"white",textAlign:"center",marginTop:"10px"}}> Espace Admin</span></div></Link></div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div style={{display:"flex"}}>
            {/* <img src={"/images/ofppt-logo.png"} style={{"height":"10%"}}></img>Espace Admin */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="1" d="M0,288L48,288C96,288,192,288,288,250.7C384,213,480,139,576,128C672,117,768,171,864,176C960,181,1056,139,1152,149.3C1248,160,1344,224,1392,256L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg> */}
          </div></Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
              // color:"white",
              fontSize:"16px",
              fontWeight:"bold"
            }}
          >
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item><span>{location.pathname.split('/')[1]}</span></Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
           <Outlet></Outlet>
          </div>
        </Content>
        {/* <Footer
          style={{
            textAlign: 'center',
          }}
        >
         YourLibrary
        </Footer> */}
      </Layout>
    </Layout>
     
        </>
    )
}

