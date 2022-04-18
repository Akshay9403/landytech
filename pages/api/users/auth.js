import {usersRepo} from '../../../helpers/users-repo';

export default handler;

function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return authUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  function authUser() {
    console.log(req.body);
    const user = usersRepo.auth(req.body.email, req.body.password);
    console.log(user)
    if (user) {
      return res.status(200).json(user);
    }

    return res.status(401).json({error: "Invalid email or password"});
  }
}
