import Router, { Request, Response } from "express";
import Post from "../models/post.model";
import { ResponseType } from "../helpers/responseStatus";
import { AuthRequest, auth } from "../helpers/auth";
import { upload } from "../helpers/fileUpload";
import fs from "fs";
import { serverMessage } from "../../client/src/features/message/messageSlice";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  return res.status(200).json({
    state: ResponseType.SUCCESS,
    message: `Posts`,
    body: posts,
  });
});

router.get("/:postId", async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.postId);
  return res.status(200).json({
    state: ResponseType.SUCCESS,
    message: `Post`,
    body: post,
  });
});

router.post(
  "/",
  auth,
  upload.array("files"),
  async (req: AuthRequest, res: Response) => {
    try {
      let { files }: any = req;
      let paths = files?.map(
        (file: any) => "http://localhost:5000/" + file.path
      )!;
      let { username, userId, userProfileImage }: any = req.user;
      let { content } = req.body;
      let post = {
        content,
        username,
        userId,
        userProfileImage,
        images: paths,
      };
      await Post.create(post);

      return res.status(200).json({
        state: ResponseType.SUCCESS,
        message: `Post created!`,
        body: post,
      });
    } catch (e) {
      return res.status(400).json({
        state: ResponseType.SUCCESS,
        message: `Something went wrong. Post not created.`,
      });
    }
  }
);

//upload file
router.post(
  "/files",
  upload.array("files"),
  async (req: AuthRequest, res: Response) => {
    let { files }: any = req;
    let paths = files?.map((file: any) => file.path)!;
  }
);

//add like
router.put("/:postId/like", auth, async (req: AuthRequest, res: Response) => {
  let { userId }: any = req.user;
  let post = await Post.findById(req.params.postId);
  //if index already exist -1 = not | x >= 0 exist;
  let userIds = post!.likes.map((like: any) => like.userLikedId.toString());
  let index = userIds.indexOf(userId);
  if (index == -1) {
    post!.likes.push({ userLikedId: userId });
    await post!.save();
    return res.status(200).json({
      state: ResponseType.SUCCESS,
      message: `Post liked`,
      body: post,
    });
  } else {
    post!.likes.splice(index, 1);
    await post!.save();
    return res.status(200).json({
      state: ResponseType.SUCCESS,
      message: `Post unliked`,
      body: post,
    });
  }
});

router.post(
  "/:postId/comment",
  auth,
  async (req: AuthRequest, res: Response) => {
    let { content } = req.body;
    let { userId, userProfileImage, username }: any = req.user;
    let { postId } = req.params;
    let comment = {
      userCommentedId: userId,
      userCommentedName: username,
      userCommentedProfileImage: userProfileImage,
      commentContent: content,
    };
    let post = await Post.findById(postId);
    post!.comments.push(comment);
    await post!.save();
    return res.status(200).json({
      state: ResponseType.SUCCESS,
      message: `Post commented`,
      body: post,
    });
  }
);

const postRoutes = router;
export default postRoutes;
