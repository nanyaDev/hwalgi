const handler = async (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json({});
  }

  if (req.method === 'POST') {
    res.status(200).json({});
  }
};

export default handler;
