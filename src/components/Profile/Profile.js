import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";

function Profile(props) {
  const [file, setFile] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [profileImg, setProfileImg] = useState(undefined);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const {
    state: { user },
  } = useContext(AuthContext);

  const fileInput = useRef(null);

  const cookie = Cookies.get("jwt-cookie");

  function handleOnSubmit(e) {
    e.preventDefault();
    let data = new FormData();
    data.append("image", file);
    axios({
      method: "post",
      url: "http://localhost:8080/api/pics/upload-player-image-to-db",
      headers: {
        authorization: `Bearer ${cookie}`,
      },
      data,
    })
      .then((res) => {
        handleGetPic();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleOnChange() {
    if (fileInput.current.files.length !== 0) {
      setFile(fileInput.current.files[0]);
      setImage(URL.createObjectURL(fileInput.current.files[0]));
      setIsButtonDisabled(false);
    }
  }

  function arrayBufferToBase64(buffer) {
    //convert the buffer to base64
    let binary = "";
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  function handleGetPic() {
    axios({
      method: "get",
      url: `http://localhost:8080/api/pics/player-image`,
      headers: {
        authorization: `Bearer ${cookie}`,
      },
    }).then(function (res) {
      let OurPic = arrayBufferToBase64(res.data.payload.img.data.data);
      let OurPicSrc = `data:image/png;base64,${OurPic}`;
      setFile(undefined);
      setImage(undefined);
      setProfileImg(OurPicSrc);
      setIsButtonDisabled(true);
    });
  }

  useEffect(() => {
    handleGetPic();
  }, []);

  return (
    <div>
      <form className="file-form" onSubmit={handleOnSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "10px 0px",
            alignItems: "flex-end",
            width: "500px",
          }}
        >
          <div>
            <label>
              Upload your Photo:
              <input
                name="image"
                type="file"
                ref={fileInput}
                accept="image/*"
                onChange={handleOnChange}
                style={{ cursor: "grab" }}
              />
            </label>
          </div>
          <div>
            <button type="submit" disabled={isButtonDisabled}>
              Upload
            </button>
          </div>
        </div>
      </form>
      <div className="inline-div">
        <div style={{ width: "250px" }}>
          <h3 className="image-headers">Your Profile Pic</h3>
          {profileImg && <img src={profileImg} alt="profile"></img>}
        </div>
        <div style={{ width: "250px" }}>
          <h3 className="image-headers">Preview Upload</h3>
          {image && <img src={image} alt="profile"></img>}
        </div>
      </div>
    </div>
  );
}

export default Profile;
