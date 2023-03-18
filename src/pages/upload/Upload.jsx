import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./upload.scss";
import axiosInstance from "../../apiConfig";
import axios from "axios";
import NavBar from "../../components/navBar/NavBar";
const Upload = () => {
  const uploadImage = () => {};
  const imageRef = useRef();
  const nameRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "error happened",
  });
  const checkFileType = (e) => {
    const selectedFile = e.target.files[0]; //getting the pic
    if (selectedFile && !selectedFile.type.includes("image")) {
      imageRef.current.value = null;
      setErrorMessage({
        message: "only images are allowed",
        status: true,
      });
    } else if (selectedFile && selectedFile.size > 10485760) {
      imageRef.current.value = null;
      setErrorMessage({
        state: true,
        message: "maximum 10 mb images are allowed!",
      });
    } else if (
      selectedFile &&
      selectedFile.size <= 10485760 &&
      selectedFile.type.includes("image")
    ) {
      setImage(selectedFile);
    }
  };

  const upload_image = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", image);
    formdata.append("upload_preset", "temp-drive");
    formdata.append("cloud_name", "dqmdvlifd");

    setLoading(true);

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dqmdvlifd/image/upload",
        formdata
      );

      await axiosInstance.post("/", {
        imageUrl:
          "https://res.cloudinary.com/dqmdvlifd/image/upload/dpr_auto/" +
          res.data.public_id,
        imageId: res.data.public_id,
        uploaderName: nameRef.current.value,
        uploadDate: Date.now(),
        imageSize: image.size,
      });

      setLoading(false);

      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setErrorMessage({
        state: true,
        message: "error happened",
      });
    }
  };

  useEffect(() => {
    if (errorMessage.status) {
      setTimeout(() => {
        setErrorMessage({
          status: false,
          message: "",
        });
      }, 2000);
    }
  }, [errorMessage.status]);
  return (
    <>
      <NavBar />
      <div className="upload">
        <h3>Upload Your image</h3>
        {errorMessage.status && <p>{errorMessage.message}</p>}
        <form action="" onSubmit={upload_image}>
          <input type="file" required onChange={checkFileType} ref={imageRef} />
          <input
            type="text"
            placeholder="Enter Your Name"
            required
            ref={nameRef}
          />
          <button type="submit" disabled={loading}>
            upload image
          </button>
          {loading && <p>Uploading Image Please Wait</p>}
        </form>
      </div>
    </>
  );
};

export default Upload;
