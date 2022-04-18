import {useRouter} from 'next/router'
import {useCookies} from "react-cookie"

export default function Logout() {
  const [userCookie, setUserCookie] = useCookies(["user"])
  const router = useRouter()

  setUserCookie("user",null);
  router.push("/")

  return (
    <h1>Logout...</h1>
  )
}
