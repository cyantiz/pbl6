export const cutoff = (str: string | undefined, length: number) => {
  if (!str) return '';

  if (str.length <= length) {
    return str;
  }

  return `${str.slice(0, length)}...`;
};

export const convertFileToBinaryString = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read file as binary string.'));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsBinaryString(file);
  });
};
