import Link from 'next/link'
import {Button, Form, Input, message, Radio, Select} from 'antd';
import {useCookies} from "react-cookie"
import {useEffect, useState} from "react";
import LayoutComponent from "../../components/LayoutComponent";
import handleErrors from "../../helpers/handleErrors";
import {useRouter} from 'next/router'

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 4},
};

export default function Home() {
  const [userCookie, setUserCookie] = useCookies(["user"])
  const [roles, setRoles] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/roles");
        const json = await response.json();
        setRoles(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const onFinish = async (values) => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        router.push('/users')
      })
      .catch((error) => {
        console.error('Error:', error);
        message.error(error.message);
      });
  };

  return (
    <LayoutComponent userCookie={userCookie}>
      <h1>Create new user</h1>
      <Form {...layout} onFinish={onFinish}>
        <Form.Item label="Title" name="title" initialValue="Mr">
          <Radio.Group>
            <Radio.Button value="Mr">Mr</Radio.Button>
            <Radio.Button value="Mrs">Mrs</Radio.Button>
            <Radio.Button value="Ms">Ms</Radio.Button>
            <Radio.Button value="Miss">Miss</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name='firstName' label="First Name" rules={[{required: true}]}>
          <Input/>
        </Form.Item>
        <Form.Item name='lastName' label="Last Name">
          <Input/>
        </Form.Item>
        <Form.Item name='email' label="Email" rules={[{type: 'email', required: true}]}>
          <Input/>
        </Form.Item>
        <Form.Item name='roles' label="Roles" rules={[{required: true}]}>
          <Select mode="multiple" allowClear style={{width: '100%'}} placeholder="Please select">
            {roles && roles.map((el) => (
              <Select.Option key={el}>{el}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='password' label="Password" rules={[{required: true}]}>
          <Input type={"password"}/>
        </Form.Item>

        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 4}}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>

          <Button type="secondary"><Link href="/users">Cancel</Link></Button>
        </Form.Item>
      </Form>
    </LayoutComponent>
  )
}