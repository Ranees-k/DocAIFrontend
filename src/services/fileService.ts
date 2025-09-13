import axios from 'axios';
import { API_BASE_URL } from '../config/api';

// Debug: Log the API URL to check if it's loaded correctly
console.log('API_BASE_URL from config:', API_BASE_URL);
console.log('process.env.REACT_APP_API_URL:', process.env.REACT_APP_API_URL);

export interface UploadResponse {
  success: boolean;
  documentId: string;
  message: string;
  chunks?: number;
}

export const uploadFile = async (
  file: File,
  userId: string,
  onProgress?: (progress: number) => void
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId);

  // Use the centralized API configuration
  const uploadUrl = `${API_BASE_URL}/file/upload`;
  console.log('Upload URL:', uploadUrl);

  try {
    const response = await axios.post(uploadUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Upload error:', error);
    throw new Error(error.response?.data?.message || 'Upload failed');
  }
};

export const deleteFile = async (documentId: string): Promise<void> => {
  const deleteUrl = `${API_BASE_URL}/file/${documentId}`;
  console.log('Delete URL:', deleteUrl);

  try {
    await axios.delete(deleteUrl, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  } catch (error: any) {
    console.error('Delete error:', error);
    throw new Error(error.response?.data?.message || 'Delete failed');
  }
}; 