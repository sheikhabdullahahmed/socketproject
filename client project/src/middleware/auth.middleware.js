import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authorized" });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.id;
    console.log("req.userId =", req.userId);
    next();
  } catch (err) {
    res.status(401).json({ message: "Toekn Invalid" });
  }
};



