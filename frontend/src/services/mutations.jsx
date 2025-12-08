//file to hold query muations to alter objects after altering
import axiosInstance from './api';
import { useMutation, useQueryClient } from '@tanstack/react-query';



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
      
      // Just return the response data, don't trigger download here
      return { response, image };
    },

    onSuccess: (data) => {
      const { response, image } = data;
      
      // Trigger download after mutation is fully complete
      if (task === "textFile" || task === "JSON" || task === "deletedata" ) {
        const blob = new Blob([response.data], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        if (task === "deletedata"){
          link.setAttribute("download", `image_${image.id}_${task}.jpg`)
        } else 
          {
            link.setAttribute("download", `image_${image.id}_${task}.txt`)
          };
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        
      } 
    },

    onError: (error) => {
      console.log(`Error performing ${task} on image:`, error);
    }
  });
}


//mutation to send API image and update metadata from edit form

export function useEditMetadata(selectedImage) {
 
  return useMutation({
    mutationFn: async (formData) => {
      const response = await axiosInstance.patch(
        `/api/images/${selectedImage.id}/editmetadata/`, 
        formData,
        {
          responseType: 'blob'
        }
      );
      return response.data;
    },
    onSuccess: (blob) => {
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = selectedImage.upload_name || 'edited-image.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      console.log('Image downloaded successfully');
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
 