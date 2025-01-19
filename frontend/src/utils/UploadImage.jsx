import Axios from "../Axios"; // or wherever your Axios instance is defined
import { toast } from "react-toastify";

export const uploadImage = async (file, changeLink) => {
  if (!file) return;

  let formData = new FormData();
  formData.append("image_file", file); // Append the file to FormData

  try {
    const response = await Axios.post("/image/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Required to send files
      },
    });

    if (response.status === 200) {
      changeLink(response.data.fileUrl); // Assuming the server returns the file URL
      toast.success("Image uploaded successfully");
    } else {
      toast.error("Failed to upload image");
    }
  } catch (error) {
    console.error("File upload failed:", error);
    toast.error("An error occurred while uploading the file");
  }
};
