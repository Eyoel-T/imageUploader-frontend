import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../apiConfig";
import Image from "../../components/image/Image";
import NavBar from "../../components/navBar/NavBar";
import "./displayImage.scss";
const DisplayImage = () => {
  const [listOfImages, setListOfImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getListOfImages = async () => {
      try {
        const res = await axiosInstance.get("/");
        setListOfImages(res.data.imageList);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getListOfImages();
  }, []);
  return (
    <>
      <NavBar />
      <div className="displayImage">
        {listOfImages.length === 0 && loading === false && (
          <div className="noImage">
            <h1>Loading</h1>
            <button onClick={() => navigate("/upload")}>Upload Image</button>
          </div>
        )}

        {loading && (
          <div className="noImage">
            <h1>Loading</h1>
          </div>
        )}

        {listOfImages.map((imageInfo) => (
          <Image
            key={imageInfo.imageId}
            imageInfo={imageInfo}
            setListOfImages={setListOfImages}
          />
        ))}
      </div>
    </>
  );
};

export default DisplayImage;
