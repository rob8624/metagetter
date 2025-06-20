import React, { useState } from 'react';


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


    const UploadTitle = ({title, descripition, subDescription}) => {
        return (
            <div className="grid grid-cols-[auto_1fr] gap-x-8">
                <div className='text-4xl sm:text-6xl'>
                    <h2>{title}</h2>
                </div>
                <div className='col-span-full sm:col-start-2'>
                    <h3 className='mb-2 text-xl'>{descripition}</h3>
                    <p className='text-sm font-bold'>{subDescription}</p>
                </div>
            </div>
        )
    }







    return (
            <>
            
            <div className='flex flex-col w-full md:w-1/2 mt-10'>
            <UploadTitle title={'UPLOAD.'} 
            descripition={'Welcome to your upload page'} 
            subDescription={'Here you can upload files using the uploader below'}/>
                <FilePond 
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={true}
                    maxFiles={5}
                    server="/api"
                    name="files"
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    credits={false}
                />
            </div>
            </>
        );
}