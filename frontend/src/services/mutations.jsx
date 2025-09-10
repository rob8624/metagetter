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