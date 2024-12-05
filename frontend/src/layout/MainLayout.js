import React from "react";
import { Button, Layout, theme } from "antd";
import ToolBox from "components/tool-box";
import SearchBox from "components/search-box";
import { ReloadOutlined } from '@ant-design/icons';
import { reloadCodes } from "services/data.services";

const { Content, Footer, Sider, Header } = Layout;

const MainLayout = (props) => {

    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

    const reloadCodesClick = () => {
        reloadCodes().then(response=>{
            window.location.reload();
        });
    }

    return (<Layout hasSider>
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, }}  >
            <ToolBox />
        </Sider>
        <Layout style={{ marginLeft: 200, }}>
            <Header className="sticky" style={{ display: 'flex', alignItems: 'center', }}  >
                <SearchBox />
                <Button style={{ marginLeft: "50px" }} type="primary" size="large" onClick={reloadCodesClick} icon={<ReloadOutlined />} />
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial', }}>
                <div style={{ padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG, }}>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        {props.children}
                    </React.Suspense>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center', position: 'fixed', right: 0, left: 0, bottom: 0, }}>
                Etiya ©{new Date().getFullYear()} Created by HakTOR
            </Footer>
        </Layout>
    </Layout>
    );
}

export default MainLayout;
