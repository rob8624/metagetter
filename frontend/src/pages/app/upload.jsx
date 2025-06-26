import React, { useState, useEffect } from 'react';

import useVerifyUser from '../../hooks/verifyUser';
// import VerifyUser from '../../hooks/verifyUser.jsx';

import { FaArrowUp,} from 'react-icons/fa';


// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';


// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
export default function Upload() {


    const [files, setFiles] = useState([]);
    const {loading} = useVerifyUser()
    const [csrfToken, setCsrfToken] = useState('');

    const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

    // Get CSRF token when component mounts
  useEffect(() => {
    const getCSRFToken = () => {
      // Try to get from cookie
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
      
      if (cookieValue) {
        setCsrfToken(cookieValue);
        return;
      }
      
      // Try to get from meta tag
      const metaTag = document.querySelector('meta[name=csrf-token]');
      if (metaTag) {
        setCsrfToken(metaTag.getAttribute('content'));
        return;
      }
      
      // Try to get from hidden input
      const hiddenInput = document.querySelector('[name=csrfmiddlewaretoken]');
      if (hiddenInput) {
        setCsrfToken(hiddenInput.value);
      }
    };
    
    getCSRFToken();
  }, []);


 

    


    const UploadTitle = ({title, descripition, subDescription, icon, color}) => {
        return (
            <div className="grid grid-cols-[auto_1fr] gap-x-6 mb-5">
                <div className='sm:place-self-end'>
                    <div className='flex text-4xl sm:text-6xl'>
                        <h2>{title}</h2>
                        <div style={{ color: color }} className="icon-container">
                            {icon}
                        </div>
                    </div>
                    <p className='text-sm text-muted-foreground pt-2'>{subDescription}</p>
                </div>
                 
                <div className='col-span-full lg:col-start-2'>
                    <h3 className='mb-2 text-3xl lg:text-5xl font-bold  black'>{descripition}</h3>
                </div>
              
            </div>
        )
    }

return (
            <>
            
            <div className='flex flex-col w-full md:w-1/2 mt-14'>
            <UploadTitle title={'UPLOAD'} 
            descripition={'Welcome to your upload page...'} 
            subDescription={'Here you can upload files using the uploader below'}
            icon={<FaArrowUp />}
            color={'grey'}/>
                { loading ? <div>loading</div> :
                <FilePond
                            files={files}
      onupdatefiles={setFiles}
      allowMultiple={true}
      maxFiles={5}
      name="file"
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      credits={false}
      server={{
        url: `${API_URL}/fp`,
        headers: {
          'X-CSRFToken': csrfToken,
        },
        process: {
          url: '/process/',
          method: 'POST',
          headers: {
            'X-CSRFToken': csrfToken,
          },
          withCredentials: false,
          ondata: (formData) => {
            // This is the crucial part from the blog - add fp_upload_field
            let upload_field = '';
            for (let item of formData.keys()) {
              upload_field = item;
              break;
            }
            if (upload_field !== '') {
              formData.append('fp_upload_field', upload_field);
            }
            return formData;
          },
          onerror: (response) => { 
            console.log('Upload error:', response); 
          },
        },
        patch: '/patch/',
        revert: '/revert/',
        fetch: '/fetch/?target=',
      }}
/>
                    }
            </div>
            </>
        );
}