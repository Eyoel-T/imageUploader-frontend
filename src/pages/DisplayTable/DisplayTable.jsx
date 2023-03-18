import React, { useEffect, useState } from "react";
import axiosInstance from "../../apiConfig";
import NavBar from "../../components/navBar/NavBar";
import "./displayTable.scss";
const DisplayTable = () => {
  const [listOfImages, setListOfImages] = useState([]);
  useEffect(() => {
    const getListOfImages = async () => {
      const res = await axiosInstance.get("/");
      setListOfImages(res.data.imageList);
    };

    getListOfImages();
  }, []);
  return (
    <>
      <NavBar />
      <div className="displayTable">
        <table class="styled-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>File size</th>
              <th>Uploaded Date</th>
              <th>Uploader</th>
            </tr>
          </thead>
          <tbody>
            {listOfImages.map((imageInfo) => (
              <tr>
                <td>{imageInfo.imageId}</td>
                <td>{imageInfo.imageSize}</td>
                <td>{imageInfo.createdAt}</td>
                <td>{imageInfo.uploaderName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DisplayTable;
