export const cutoff = (str: string | undefined, length: number) => {
  if (!str) return '';

  if (str.length <= length) {
    return str;
  }

  return `${str.slice(0, length)}...`;
};
