const roles = require('../../../data/roles.json');

export default handler;

function handler(req, res) {
  return res.status(200).json(roles);
}
