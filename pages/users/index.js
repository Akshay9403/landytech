import Link from 'next/link'
import {Layout, Menu, Table, Button} from 'antd';
import {useCookies} from "react-cookie"
import {useEffect, useState} from "react";
import LayoutComponent from "../../components/LayoutComponent";

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Surname',
    dataIndex: 'lastName',
    key: 'lastName',
  },
];

export default function Home() {
  const [userCookie, setUserCookie] = useCookies(["user"])

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users");
        const json = await response.json();
        setAllUsers(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  console.log(allUsers)

  return (
    <LayoutComponent userCookie={userCookie}>
      <Button type="primary"><Link href="/users/create">Create</Link></Button>
      {allUsers && (<Table dataSource={allUsers} columns={columns}/>)}
    </LayoutComponent>
  )
}