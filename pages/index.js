import {useState} from "react";
import {Button, Form, Input} from 'antd';
import styles from '../styles/Home.module.css'
import handleErrors from "../helpers/handleErrors";
import {useRouter} from 'next/router'
import {useCookies} from "react-cookie"

export default function Home() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [userCookie, setUserCookie] = useCookies(["user"])
  const router = useRouter()

  const onFinish = async (values) => {
    const res = await fetch('/api/users/auth', {
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

        setUserCookie("user", JSON.stringify(data), {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });

        router.push('/users')
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMsg(error.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <Form
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{required: true, message: 'Please input your email!'}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{required: true, message: 'Please input your password!'}]}
        >
          <Input.Password/>
        </Form.Item>

        {errorMsg && (<span className={styles.errorMsg}>{errorMsg}</span>)}

        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
