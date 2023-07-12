import Router, { Request, Response } from "express";
import Post from "../models/post.model";
import { ResponseType } from "../helpers/responseStatus";
import { AuthRequest, auth } from "../helpers/auth";
import { upload } from "../helpers/fileUpload";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const posts = await Post.find();
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
  upload.fields([
    { name: "content", maxCount: 1 },
    { name: "photos", maxCount: 20 },
  ]),
  async (req: AuthRequest, res: Response) => {
    try {
      let { username, userId }: any = req.user;
      let { content } = req.body;
      console.log(req.files);
      let post = {
        content,
        username,
        userId,
      };
      await Post.create(post);
      return res.status(200).json({
        state: ResponseType.SUCCESS,
        message: `Post created!`,
      });
    } catch (e) {
      return res.status(400).json({
        state: ResponseType.SUCCESS,
        message: `Something went wrong.Post not created.`,
      });
    }
  }
);

const postRoutes = router;
export default postRoutes;
