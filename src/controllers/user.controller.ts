import Router, { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

import { ResponseType } from "../helpers/responseStatus";
import { AuthRequest, auth } from "../helpers/auth";

import jwt from "jsonwebtoken";
import Post from "../models/post.model";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  let { username, password, email } = req.body;
  try {
    let user = await User.findOne({ email });
    console.log(email);
    if (user !== null) {
      return res.status(200).json({
        state: ResponseType.FALIURE,
        message: "Registration Failed. User already exist in database!",
      });
    } else {
      password = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_SALT!)
      );
      user = await User.create({ username, password, email });
      return res.status(201).json({
        state: ResponseType.SUCCESS,
        message: "Registration Successful!",
        body: user,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      state: ResponseType.FALIURE,
      message: "Server error!",
      body: err,
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      let isEqual = await bcrypt.compare(password, user.password);
      if (isEqual) {
        let data = {
          userId: user._id,
          username: user.username,
          userProfileImage: user.userProfileImage,
        };
        let token = await jwt.sign(data, process.env.JWT_SECRET!);
        return res.status(200).json({
          state: ResponseType.SUCCESS,
          message: "Logged In",
          body: {
            token,
            userId: user.id,
            username: user.username,
            userProfileImage: user.userProfileImage,
          },
        });
      } else {
        return res.status(401).json({
          state: ResponseType.FALIURE,
          message: "Invalid Credentials!",
        });
      }
    } else {
      return res.status(401).json({
        state: ResponseType.FALIURE,
        message: "Invalid Credentials!",
      });
    }
  } catch (e) {
    return res.status(500).json({
      state: ResponseType.FALIURE,
      message: "Object with wrong keys",
    });
  }
});

router.get("/", auth, async (req: AuthRequest, res: Response) => {
  const users = await User.find().select("-password");
  return res.json({
    state: ResponseType.SUCCESS,
    message: "All users",
    body: users,
  });
});

router.get("/:userId", async (req: Request, res: Response) => {
  let { userId } = req.params;
  const user = await User.findById({ _id: userId }).select("-password");
  const posts = await Post.find({ userId });
  return res.json({
    state: ResponseType.SUCCESS,
    message: `User of id ${userId}`,
    body: {
      user,
      posts,
    },
  });
});

router.patch("/change", auth, async (req: AuthRequest, res: Response) => {
  if (req.query.ch == "pw") {
    try {
      let { password } = req.body;
      let { userId }: any = req.user;
      let user = await User.findById(userId);
      user!.password = password;
      user?.save();
      return res.json({
        state: ResponseType.SUCCESS,
        message: `Password of ${user?.username} changed`,
        body: user,
      });
    } catch (e) {
      return res.status(500).json({
        state: ResponseType.FALIURE,
        message: `Internal server error`,
      });
    }
  } else if (req.query.ch == "un") {
    try {
      let oldUsername;
      let { username } = req.body;
      let { userId }: any = req.user;
      let user = await User.findById(userId);
      let isUsernameTaken = await User.find({ username });

      if (isUsernameTaken === undefined) {
        oldUsername = user!.username;
        user!.username = username;
        user?.save();
        return res.status(200).json({
          state: ResponseType.SUCCESS,
          message: `Password of ${oldUsername} changed to ${user!.username}!`,
          body: user,
        });
      } else {
        //status
        return res.json({
          state: ResponseType.FALIURE,
          message: `Username already taken!`,
        });
      }
    } catch (e) {
      return res.status(500).json({
        state: ResponseType.FALIURE,
        message: `Internal server error`,
      });
    }
  } else if (req.query.ch == "em") {
    try {
      let { email } = req.body;
      let { userId }: any = req.user;
      let user = await User.findById(userId);
      let isUsernameTaken = await User.find({ email });

      if (isUsernameTaken === undefined) {
        user!.email = email;
        user?.save();
        return res.status(200).json({
          state: ResponseType.SUCCESS,
          message: `Email of ${user!.username} changed to ${user!.email}!`,
          body: user,
        });
      } else {
        //status
        return res.json({
          state: ResponseType.FALIURE,
          message: `Username already taken!`,
        });
      }
    } catch (e) {
      return res.status(500).json({
        state: ResponseType.FALIURE,
        message: `Internal server error`,
      });
    }
  } else {
    return res.status(404).json({
      state: ResponseType.FALIURE,
      message: `Invalid querystring`,
    });
  }
});

const userRoutes = router;

export default userRoutes;
