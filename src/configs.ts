const configs = {
  BACK_END_URL: import.meta.env.VITE_BACK_END_URL || '',
  API_TIME_OUT: import.meta.env.VITE_API_TIME_OUT || 5000,
  MEDIA_STORAGE_HOST: import.meta.env.VITE_MEDIA_STORAGE_HOST || '',

  TOAST_DEFAULT_DURATION: 4000,
};

export default configs;
