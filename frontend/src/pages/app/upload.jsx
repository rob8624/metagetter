import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";

//context
import { UserContext } from "../../context/userContext";

import useVerifyUser from "../../hooks/verifyUser";
// import VerifyUser from '../../hooks/verifyUser.jsx';

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";


// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, 
  FilePondPluginImageTransform, FilePondPluginFileValidateSize);

// Our app
export default function Upload() {
  const [files, setFiles] = useState([]);
  const { loading, isVerified } = useVerifyUser();
  const [csrfToken, setCsrfToken] = useState("");
  const [success, setSuccess] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);
  const [processedStarted, setProcessedStated] = useState(false)

  //checkbox state
  const [checked, setChecked] = useState(true)

  //countdown state 
  const [count, setCount] = useState(5)

  const navigate = useNavigate();

  const { setUpdating } = useContext(UserContext)

  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const accessToken = localStorage.getItem('a_t')

  // Get CSRF token when component mounts
  useEffect(() => {
    const getCSRFToken = () => {
      // Try to get from cookie
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        ?.split("=")[1];

      if (cookieValue) {
        setCsrfToken(cookieValue);
        return;
      }

      // Try to get from meta tag
      const metaTag = document.querySelector("meta[name=csrf-token]");
      if (metaTag) {
        setCsrfToken(metaTag.getAttribute("content"));
        return;
      }

      // Try to get from hidden input
      const hiddenInput = document.querySelector("[name=csrfmiddlewaretoken]");
      if (hiddenInput) {
        setCsrfToken(hiddenInput.value);
      }
    };

    getCSRFToken();
    
  }, []);

  const handleAllFilesComplete = () => {
    setUpdating(true)
    setSuccess(true);
    setProcessedStated(false)
    if (checked) {
    let countdownValue = 5;
    setCount(countdownValue);
    
    const countdownInterval = setInterval(() => {
      countdownValue = countdownValue - 1;  
      setCount(countdownValue);
      
      if (countdownValue <= 0) {
        clearInterval(countdownInterval);
        navigate("/viewer");
      }
    }, 1000);
  }
    
  };

  return (
    <>
    { isVerified ?
    <div className="flex justify-center"> 
      <div className="flex flex-col w-full md:w-1/2 mt-14">
      
        <div className="flex flex-col justify-center items-center">
            { processedStarted ? <div className="text-2xl">Processing data</div> : <div className="text-2xl dark:text-white text-black">Ready to upload</div>}
          {success && checked ? <div>Completed - Redirecting in <span className="text-blue-950 text-6xl">{count}</span> seconds...</div> : null}
          {success ? null :
            <label className="dark:text-white text-black">
            <input type="checkbox" checked={checked}
              onChange={() => setChecked((prev) => !prev)}/>
            Goto image viewer after upload?
          </label>
          }
        </div>

        {loading ? (
          <div>loading</div>
        ) : (
          <FilePond
            allowImageTransform={true}
            imageTransformOutputStripImageHead={false}
            files={files}
            onupdatefiles={(fileItems) => {
              setFiles(fileItems);
              
              if (fileItems.length === 0) {
                setSuccess(false);
                setProcessedCount(0);
              }
            }}
            allowMultiple={true}
            maxFiles={4}
            allowFileSizeValidation={true}
            maxFileSize={'5MB'}
            labelMaxFileSizeExceeded={'File is too large sorry'}
            labelMaxFileSize={'Upload size limit {filesize}'}
            name="file"
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            credits={false}
            server={{
              instantUpload: true,
              url: `${API_URL}/fp`,
              headers: {
                "X-CSRFToken": csrfToken,
              },
              process: {
                url: "/process/",
                method: "POST",
                headers: {
                  "X-CSRFToken": csrfToken,
                  'Authorization': `Bearer ${accessToken}`
                },
                maxParallelUploads:5,
                withCredentials: false,
                ondata: (formData) => {
                  
                  let upload_field = "";
                  for (let item of formData.keys()) {
                    upload_field = item;
                    break;
                  }
                  if (upload_field !== "") {
                    formData.append("fp_upload_field", upload_field);
                  }
                  return formData;
                },
                onerror: (response) => {
                  console.log("Upload error:", response);
                },
              },
              patch: "/patch/",
              revert: "/revert/",
              fetch: "/fetch/?target=",
            }}

            onprocessfilestart={(file) => {
                setProcessedStated(true)
            }}



            onprocessfile={(error, file) => {
              if (!error) {
                const newCount = processedCount + 1;
                setProcessedCount(newCount);
                
                // Check if all files are done
                if (newCount === files.length) {
                  handleAllFilesComplete();
                }
              }
            }}
          />
        )}
        <div className="flex justify-center items-center">
  <div>
    <h2 className="font-semibold mb-2">Image Upload Requirements</h2>

    <ul className="list-disc list-inside space-y-1">
      <li>Size: 5MB max</li>
      <li>Format: JPG or PNG</li>
      <li>Resolution: at least 1024×1024</li>
    </ul>
  </div>
</div>
      </div>
      </div>
:       <div>Please Sign in</div> }
    </>
  );}
