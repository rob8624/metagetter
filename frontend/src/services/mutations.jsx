//file to hold query muations to alter objects after altering
import axiosInstance from './api';
import { useMutation, useQueryClient } from '@tanstack/react-query';




const taskArray = ["textFile", "json", "deletedata", "singledownload", "xmp"]

      const taskFileExtensionMap = {
        textFile: ".txt",
        json: ".json",
        deletedata: ".jpg",
        singledownload: "Single Download",
        xmp: ".xmp"
      }




const handleBlobDownload = (response, task, image) => {
   const blob = new Blob([response.data], { type: response.data.type });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        
        link.download = `image_${image.id}_${task}${taskFileExtensionMap[task]}`;

        // Fix: Properly assign download attribute in all cases
       
        
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

}




export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (image) => {
      await axiosInstance.delete(`/api/images/${image.id}/`);
      
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['images']);
    },
  });
}








export function useDataTask(task) {
  return useMutation({
    mutationFn: async (image) => {
      const response = await axiosInstance.get(
        `/api/images/${image.id}/metadata/?task=${task}`,
        {
          responseType: "blob",
        }
      );
      
      return { response, image };
    },

    onSuccess: (data) => {
      const { response, image } = data;
      if (taskArray.includes(task))
      handleBlobDownload(response, task, image);},
    onError: (error) => {
      console.log(`Error performing ${task} on image:`, error);
    }
  });
}

//mutation to send API image and update metadata from edit form

export function useEditMetadata(selectedImage) {
 
  return useMutation({
    mutationFn: async ({formData, autoDownload}) => {
      const response = await axiosInstance.patch(
        `/api/images/${selectedImage.id}/editmetadata/`, 
        formData,
        {
          responseType: 'blob'
        }
      );
      return {blob: response.data, autoDownload};
    },
    onSuccess: ({blob, autoDownload}) => {
     if (autoDownload) 
      {const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedImage.upload_name}_edited.jpg` || 'edited-image.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      console.log('Image downloaded successfully')};
    },
    onError: (error) => {
      console.error('Error editing metadata:', error);
    }
  });
}



export function useEditSuccess(selectedImage, setIsEditing) {
  const queryClient = useQueryClient();
  return () => {
    setIsEditing(false);
    queryClient.invalidateQueries(["images"], selectedImage.id);
  };
}
 

