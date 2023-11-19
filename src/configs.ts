const configs = {
  BACK_END_URL: import.meta.env.VITE_BACK_END_URL || '',
  API_TIME_OUT: import.meta.env.VITE_API_TIME_OUT || 5000,
  AZURE_BLOB_SAS_URL: import.meta.env.VITE_AZURE_BLOB_SAS_URL || '',
  AZURE_PUBLIC_CONTAINER_NAME: import.meta.env.VITE_AZURE_PUBLIC_CONTAINER_NAME || '',
  AZURE_ORIGINAL_CONTAINER_NAME: import.meta.env.VITE_AZURE_ORIGINAL_CONTAINER_NAME || '',

  TOAST_DEFAULT_DURATION: 4000,
};

export default configs;
