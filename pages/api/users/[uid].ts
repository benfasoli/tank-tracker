// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  const { uid } = req.query;

  res.status(200).json({ name: 'John Doe' });
};
