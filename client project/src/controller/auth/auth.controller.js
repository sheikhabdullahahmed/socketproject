import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/user.js";
import message from "../../models/message.js";
// import authmiddelware from '../../middleware/auth.middleware.js'

export const singup = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;
    console.log(req.body);

    if(!location || !location.coordinates) {
      return res.status(400).json({message: "Location required"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      location,

      // ek band araha ha ta may location: {
      //   type: "Point",
      //   coordinates: [lng, lat], // ❌ lat/lng undefined → null
      // },
      
      // asa dey raha ha ta 
      // pher aya error 
      // Tum backend me body se lat / lng rea d kar rahe ho, jabke frontend location object bhej raha hai.
      // lat aur lng exist hi nahi karte
      // lat aur lng exist hi nahi karte
      // pher is ka solution location send karna 
      // lat lng asay nhi  
    });
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // /  SET TOKEN IN COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      samSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getprofile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) return res.status(400).json({ message: "User not Found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updatelocation = async (req,res) => {
    try {
        const {lng, lat} = req.body;
        if (!lng || !lat )
            return res.status(400).json({message: "Location required"})

        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                location: {
                    type:"Point",
                    coordinates: [lng, lat]
                }
            },
            {new: true}
        );
    }catch(error) {
        res.status(400).json({message: error.message})
    }
}