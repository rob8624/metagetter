import React, { useState } from 'react';
import { UseLoggedIn } from '../../context/userContext';
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
                    server="/api"
                    name="files"
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    credits={false}/>
                    }
            </div>
            </>
        );
}