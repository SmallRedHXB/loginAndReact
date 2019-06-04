import React from 'react'
import './homepage.css'
import 'antd/dist/antd.css';

import { Layout, Menu, Icon, Card, Col, Row, Table } from 'antd';

const ServerInfo = () => {

    // render() {
    return (
        // <div style={{ background: '#ECECEC', padding: '30px' }}>
        <div style={{ background: 'white', padding: 0 }}>
            <Card title="统计信息" bordered={false}>
                <Row gutter={24}>
                    <Col span={6}>
                        <Card title="bug总数" bordered={true}>
                            999
                            </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="个人检测bug数" bordered={true}>
                            333
                            </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="需求数" bordered={true}>
                            333
                            </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="任务数" bordered={true}>
                            333
                            </Card>
                    </Col>
                </Row>
            </Card>
        </div>
    )
    // }

}


const JenkinsInfo = () => {

    // render() {
    const {Column} = Table;
    const data = [
        {
        key: '1',
        job_name: 'huxb的项目',
        deployed_by: 'huxb',
        result: 'success',
        deployed_at: '2019-05-29 15:58:28',
      },
        {
        key: '2',
        job_name: 'huxb的项目',
        deployed_by: 'huxb',
        result: 'fail',
        deployed_at: '2019-05-29 15:58:28',
      },
        {
        key: '3',
        job_name: 'huxb的项目',
        deployed_by: 'huxb',
        result: 'success',
        deployed_at: '2019-05-29 15:58:28',
      },
      {
        key: '4',
        job_name: 'huxb的项目',
        deployed_by: 'huxb',
        result: 'success',
        deployed_at: '2019-05-29 15:58:28',
      },
      {
        key: '5',
        job_name: 'huxb的项目',
        deployed_by: 'huxb',
        result: 'success',
        deployed_at: '2019-05-29 15:58:28',
      },
      {
        key: '6',
        job_name: 'huxb的项目',
        deployed_by: 'huxb',
        result: 'success',
        deployed_at: '2019-05-29 15:58:28',
      },
      {
        key: '7',
        job_name: 'huxb的项目',
        deployed_by: 'huxb',
        result: 'fail',
        deployed_at: '2019-05-29 15:58:28',
      },
      {
        key: '8',
        job_name: 'huxb的项目',
        deployed_by: 'huxb',
        result: 'success',
        deployed_at: '2019-05-29 15:58:28',
      },
      {
        key: '9',
        job_name: 'huxb的项目',
        deployed_by: 'huxb',
        result: 'success',
        deployed_at: '2019-05-29 15:58:28',
      },
      {
        key: '10',
        job_name: 'huxb的项目',
        deployed_by: 'huxb',
        result: 'success',
        deployed_at: '2019-05-29 15:58:28',
      },
    ];
    return (
        <div style={{ background: 'white', padding: 0 }}>
            <Card title="发布记录" bordered={false}>              
                <Table dataSource={data} scroll={{ x: 1500, y: 600 }}>
                    <Column title="发布项目" dataIndex="job_name" key="job_name" />
                    <Column title="发布者" dataIndex="deployed_by" key="deployed_by" />
                    <Column title="发布结果" dataIndex="result" key="result" />
                    <Column title="发布时间" dataIndex="deployed_at" key="deployed_at" />                    
                </Table>
            </Card>
        </div>
    )
    // }

}



const { Header, Sider, Content } = Layout;

class Homepage extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    clickMenuItem = (path) => {
        console.log(path)
        this.props.history.push(path)
        // this.props.setCurrentApp({})
        // this.props.setCurrentGroup([])
      }    

    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo">测试系统</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" onClick={() => this.clickMenuItem('')}>
                            <Icon type="user" />
                            <span>Dashboard</span>
                        </Menu.Item>
                        <Menu.Item key="2"  onClick={() => this.clickMenuItem('/cmdb/')}>
                            <Icon type="video-camera" />
                            <span>需求管理</span>
                        </Menu.Item>
                        <Menu.Item key="3" onClick={() => this.clickMenuItem('/jenkins/')}>
                            <Icon type="upload" />
                            <span>bug管理</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: '0px 0px 24px 0px',
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        <ServerInfo />
                        <JenkinsInfo/>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Homepage;
// export default ServerInfo;