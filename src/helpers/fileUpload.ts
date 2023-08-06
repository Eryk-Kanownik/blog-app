import multer from "multer";

const postStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/posts/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});

const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/users/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});

export const postUpload = multer({ storage: postStorage });

export const userUpload = multer({ storage: userStorage });
