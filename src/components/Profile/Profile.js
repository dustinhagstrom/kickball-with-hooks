import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "./Profile.css";

import Axios from "../../Axios";
import { AuthContext } from "../../context/AuthContext";
import { TeamContext } from "../../context/TeamContext";
import { PicContext } from "../../context/PicContext";

function Profile(props) {
  const [file, setFile] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [profileImg, setProfileImg] = useState(undefined);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [userID, setUserID] = useState(0);

  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  const {
    state: { picObject },
    dispatchPic,
  } = useContext(PicContext);

  const { dispatchTeam } = useContext(TeamContext);

  const fileInput = useRef(null);

  const cookie = Cookies.get("jwt-cookie");

  function handleOnSubmit(e) {
    e.preventDefault();
    let data = new FormData();
    data.append("image", file);
    Axios({
      method: "post",
      url: "/pics/upload-player-image-to-db",
      headers: {
        authorization: `Bearer ${cookie}`,
      },
      data,
    })
      .then((res) => {
        handleGetPic();
        console.log(res);
        dispatchPic({
          type: "SETPIC",
          picObject: {
            newPic: profileImg,
          },
        });
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
    Axios({
      method: "get",
      url: "/pics/player-image",
      headers: {
        authorization: `Bearer ${cookie}`,
      },
    }).then(function (res) {
      let OurPic = arrayBufferToBase64(res.data.payload.img.data.data);
      let OurPicSrc = `data:image/png;base64,${OurPic}`;
      console.log(res.data.foundPlayer);
      setFile(undefined);
      setImage(undefined);
      setProfileImg(OurPicSrc);
      setIsButtonDisabled(true);
      setUserID(res.data.foundPlayer);
    });
  }

  function deleteUser() {
    let result = window.confirm(
      "This action cannot be reversed and you won't be able to play!!!!"
    );
    if (result) {
      Axios({
        method: "delete",
        url: `/player/delete-player-by-id/${userID}`,
      }).then(function (res) {
        console.log(res.data.message);
        dispatch({
          type: "LOGOUT",
        });
        dispatchTeam({
          type: "RESET-TEAMS",
        });
        Cookies.remove("jwt-cookie");
        Cookies.remove("team-cookie");
        props.history.push("/");
      });
    }
  }

  useEffect(() => {
    handleGetPic();
  }, []);

  return (
    <div className="body">
      <div className="file-container">
        <form className="file-form" onSubmit={handleOnSubmit}>
          <div className="file-form__upload-container">
            <div>
              <label htmlFor="file-upload" className="custom-file-upload">
                Upload your Photo:
                <input
                  name="image"
                  type="file"
                  id="file-upload"
                  ref={fileInput}
                  accept="image/*"
                  onChange={handleOnChange}
                  style={{ cursor: "grab" }}
                />
              </label>
            </div>
            <div>
              <button
                className="file-form__upload-button"
                type="submit"
                disabled={isButtonDisabled}
              >
                Upload
              </button>
            </div>
          </div>
        </form>
        <div className="profile-pictures">
          <div className="profile-pictures__wrap">
            <h3 className="profile-pictures__title">Your Profile Pic</h3>
            {profileImg && (
              <img
                className="profile-pictures-picture"
                src={profileImg}
                alt="profile"
              ></img>
            )}
          </div>
          <div className="profile-pictures__wrap">
            <h3 className="profile-pictures__title">Preview Upload</h3>
            {image && (
              <img
                className="profile-pictures-picture"
                src={image}
                alt="profile"
              ></img>
            )}
          </div>
        </div>
      </div>
      <div className="delete-profile" onClick={deleteUser}>
        <ul>
          <li>
            <h3 style={{ margin: 0 }}>If you no longer wanna ball...</h3>
          </li>
          <li>And you don't want us to keep</li>
          <li>Your data, then go ahead and</li>
          <li>click anywhere inside this box</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
