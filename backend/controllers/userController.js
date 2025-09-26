export const getProfile = async (req, res) => {
  const { id, email, name, bio, createdAt } = req.user;
  return res.status(200).json({ id, email, name, bio, createdAt });
};
