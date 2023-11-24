import configs from '@/configs';

export interface IMediaModel {
  id: number;
  fileName: string;
  createdAt: Date;
}

export const getMediaUrl = (media?: IMediaModel) => {
  if (!media || !media.fileName) return undefined;
  return `${configs.MEDIA_STORAGE_HOST}%2F${media.fileName}?alt=media`;
};
