import { Axios_Node } from "../Axios";
import { toast } from "react-toastify";
import { Axios_Node } from "../Axios";

export const uploadImage = async (file, changeLink) => {
  if (!file) return;

  let formData = new FormData();
  formData.append("image_file", file);

  try {
    const response = await Axios_Node.post("/image/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      changeLink(response.data.fileUrl);
      toast.success("Image uploaded successfully");
    } else {
      toast.error("Failed to upload image");
    }
  } catch (error) {
    console.error("File upload failed:", error);
    toast.error("An error occurred while uploading the file");
  }
};
