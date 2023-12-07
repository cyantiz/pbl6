import { ICategoryModel, getAllCategories } from '@/services/category.service';
import classNames from 'classnames';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

type Props = {};
const CategoryListPage: FC<Props> = ({}) => {
  const navigate = useNavigate();
  const { data: categories, isFetching: isFetchingCategories } = useQuery(
    'category-list',
    () => getAllCategories(),
    {
      onError: (error) => {
        Promise.reject(error);
      },
    },
  );

  if (isFetchingCategories || !categories) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap">
      {categories.map((category, index) => (
        <CategoryListItem
          key={category.id}
          {...category}
          reverse={!!(index % 2)}
          onClick={() => navigate(`/posts/by-category?category=${category.slug}`)}
        />
      ))}
    </div>
  );
};

export default CategoryListPage;

type CategoryListItemProps = {
  reverse?: boolean;
  onClick: () => void;
} & ICategoryModel;

const CategoryListItem: FC<CategoryListItemProps> = ({ name, thumbnail, reverse, onClick }) => {
  return (
    <div
      className={classNames(
        'flex flex-[30%] xl:flex-[25%] p-2 cursor-pointer duration-300 group',
        reverse ? 'flex-col' : 'flex-col-reverse',
      )}
      onClick={onClick}
    >
      <div className="uppercase font-black rounded text-center text-lg xl:text-3xl px-3 py-6 bg-gray-200 group-hover:shadow-lg">
        {name}
      </div>
      <div className="overflow-hidden w-full h-full rounded">
        <img
          src={thumbnail}
          alt=""
          className="object-cover w-full h-full group-hover:shadow-lg group-hover:scale-110 transition-all"
        />
      </div>
    </div>
  );
};
