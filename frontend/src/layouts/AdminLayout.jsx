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
  const { Header, Content, Footer, Sider } = Layout;

export default function AdminLayout(){
    const location=useLocation()
    const navigate=useNavigate()

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
      getItem(<Link to="/Dashboard">Dashboard</Link>, '1', <PieChartOutlined style={{"paddingTop":"0px !important"}}/>),
      getItem(<Link to="/Purchases">Purchases</Link>, '2', <DollarOutlined />),
      getItem(<Link to="/Sells">Sells</Link>, '3', <UserOutlined />),
      getItem(<Link to="/Stock">Books</Link>, '4',   <ShopOutlined />),
      getItem(<Link  to="/Settings">Settings</Link>, '6', <TeamOutlined />,null,{backgroundColor:"rgb(0, 21, 41) !important"})
      ,getItem(<span onClick={()=>logout()}>Log out</span>, '7', <PoweroffOutlined />),
    ];

    
    
    return(
     
        <>
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" style={{display:"flex",justifyContent:"center"}}><Link> <div style={{}}><img src={"/images/ofppt-logo.png"} style={{height:"50px", marginTop:"20px"}}></img><span style={{color:"white"}}> Espace Admin</span></div></Link></div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        ><div style={{display:"flex"}}><img src={"/images/ofppt-logo.png"} style={{height:"50px"}}></img>    Espace Admin</div></Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>{location.pathname.split('/')[1]}</Breadcrumb.Item>
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
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
         YourLibrary
        </Footer>
      </Layout>
    </Layout>
     
        </>
    )
}


