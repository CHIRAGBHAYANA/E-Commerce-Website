const getAllProducts = (req, res) => {
  res.status(200).json({ message: "Route is Working fine" });
};

module.exports = {
  getAllProducts,
};
