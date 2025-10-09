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
      if (task === "metadata") {
        const blob = new Blob([response.data], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `image_${image.id}_${task}.txt`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }

      return response.data;
    },

    onError: (error) => {
      console.log(`Error performing ${task} on image:`, error);
    }
  });
}