import {Component} from "react";
import Link from 'next/link'
import {Layout, Menu} from 'antd';

const {Header, Footer, Content} = Layout;

export default class LayoutComponent extends Component {

  render() {
    const hasUser = this.props != null && this.props.userCookie != null && this.props.userCookie.user != null;

    return (
      <div>
        {hasUser && (
          <Layout>
            <Header>
              <Header className="header">
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1"><Link href="/users">Users</Link></Menu.Item>
                  <Menu.Item key="2">Permissions</Menu.Item>
                  <Menu.Item key="3">Roles</Menu.Item>
                  <Menu.Item key="4"><Link href="/logout">Logout</Link></Menu.Item>
                </Menu>
              </Header>
            </Header>
            <Content style={{padding: '0 50px'}}>
              <div className="site-layout-content">
                <h3>Hello {this.props.userCookie.user.firstName}</h3>
                {this.props.children}
              </div>
            </Content>
            <Footer>©2021 Landy Tech - Test Cypress</Footer>
          </Layout>
        )}
        {!hasUser && (
          <div>
            <h1>Please do login</h1>
            <Link href="/">login</Link>
          </div>
        )}
      </div>
    )
  }
}
