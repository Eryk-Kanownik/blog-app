export const authConfig = {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
};

export const fileUploadConfig = {
  headers: {
    Authorization: localStorage.getItem("token"),
    "Content-Type": "multipart/form-data",
  },
};
