import { useEffect } from "react";
import { useRef } from "react";
import PageGridTitle from "./PageGridTitle";
import { Button } from "../ui/button";


export default function TopBar({selectedImage, setSelectedImage}) {

    const filenameRef = useRef(null)

    useEffect(() => {
        if (selectedImage && filenameRef.current) {
            const element = filenameRef.current
            element.classList.remove('move-from-left');
            void element.offsetWidth;
            element.classList.add('move-from-left')
        }
    }, [selectedImage])



    return (
   
    <div id="topbar" className="mb-2 sticky top-0 z-10 bg-white border-b-2 border-black">
                    <PageGridTitle className="pt-5"
                                        title={"Viewer"}
                                        descripition={"Here you can view and edit your data"}
                                        subDescription={"Select an image to view options"}
                                        
                                        color={"grey"}
                                        />
                    <div id="topbarmenu-wrapper" className="inline-block ml-2">
                        <div id="topbarmenu" className="flex gap-2 items-center">
                          
                               {
                                selectedImage ? <>
                                <Button variant="outline" className="text-xs p-2" onClick={() => setSelectedImage(null)}>Reset</Button>
                                <div>Filename</div>
                                <div ref={filenameRef} className="move-from-left">{selectedImage?.upload_name}</div>
                                </>
                                :
                                null

                               }
                               
                                
                       
                        
                                 
                              
                    </div>
    </div>
    </div>
    )
   
}