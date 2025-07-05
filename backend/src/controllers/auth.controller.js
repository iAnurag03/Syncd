import {User} from "../models/user.model.js"


export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    const user = await User.findOne({ clerkId: id });

    if (!user) {
      const newUser = await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl: imageUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(`${firstName} ${lastName}`),
      });
      console.log("User created:", newUser);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("error while authentication", error);
    next(error)
  }
};
