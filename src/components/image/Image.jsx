import React from "react";
import { useState } from "react";
import axiosInstance from "../../apiConfig";
import "./image.scss";
const Image = ({ imageInfo, setListOfImages }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteImage = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.delete("/" + imageInfo.imageId);
      setListOfImages((prev) => {
        return prev.filter(({ imageId }) => imageId !== imageInfo.imageId);
      });
      setLoading(false);
    } catch {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="image">
      <img src={imageInfo.imageUrl} alt="" />
      <button onClick={() => setShowDetail(!showDetail)}>View Detail</button>
      <button onClick={deleteImage} disabled={loading}>
        {loading ? "deleting" : "delete"}
      </button>
      {showDetail && (
        <div className="detail">
          <span>File Name: {imageInfo?.imageId}</span>
          <span>File size,: {imageInfo?.imageSize}</span>
          <span>Uploaded Date: {imageInfo?.createdAt}</span>
          <span>Uploader: {imageInfo?.uploaderName}</span>
        </div>
      )}
    </div>
  );
};

export default Image;
