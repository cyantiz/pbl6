import { $get } from '../utils/axios';

export interface ICategoryModel {
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  createdAt: Date;
}

const apiPrefix = '/category';

export const getAllCategories = async (): Promise<ICategoryModel[]> => {
  return $get<ICategoryModel[]>(`${apiPrefix}`).then((res) => res.data);
};

export const getCategoryBySlug = async (slug: string): Promise<ICategoryModel> => {
  return $get<ICategoryModel>(`${apiPrefix}/by-slug/${slug}`).then((res) => res.data);
};
