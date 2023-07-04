import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const response = await axios.post('https://boschthailandbackend.bomboonsan.com/admin/login', {
        username,
        password,
      });

      res.status(response.status).json(response.data);
    } catch (error) {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}