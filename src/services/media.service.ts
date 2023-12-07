import configs from '@/configs';
import { $post } from '@/utils/axios';

const MODEL_PREFIX = '/media';

export interface IMediaModel {
  id: number;
  fileName: string;
  externalUrl?: string;
  alt?: string;
  createdAt: Date;
}

export const getMediaUrl = (media?: IMediaModel) => {
  if (!media || !media.fileName || !media.externalUrl) return undefined;
  if (media.externalUrl) return media.externalUrl;
  return `${configs.MEDIA_STORAGE_HOST}%2F${media.fileName}?alt=media`;
};

export const createMedia = async (file: File) => {
  const formData = new FormData();
  formData.append('filename', file);

  const media = await $post<IMediaModel>(`${MODEL_PREFIX}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => res.data);

  return media;
};
