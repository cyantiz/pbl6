export const getUserId = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return null;
  }

  const payload = accessToken.split('.')[1];

  if (!payload) {
    return null;
  }

  const decodedPayload = atob(payload);

  if (!decodedPayload) {
    return null;
  }

  const { id } = JSON.parse(decodedPayload);

  return id as number;
};
