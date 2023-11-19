import { ICategoryModel, getAllCategories } from '@/services/category.service';
import classNames from 'classnames';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

type Props = {};
const CategoryList: FC<Props> = ({}) => {
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
        <Category
          key={category.id}
          {...category}
          textFirst={!!(index % 2)}
          onClick={() => navigate(`/posts?category=${category.slug}`)}
        />
      ))}
    </div>
  );
};

export default CategoryList;

type CategoryProps = {
  textFirst?: boolean;
  onClick: () => void;
} & ICategoryModel;
const Category: FC<CategoryProps> = ({ name, thumbnail, textFirst, onClick }) => {
  return (
    <div
      className={classNames(
        'flex flex-[30%] xl:flex-[25%] p-2 hover:scale-[1.02] cursor-pointer duration-300 group',
        textFirst ? 'flex-col' : 'flex-col-reverse',
      )}
      onClick={onClick}
    >
      <div className="uppercase font-black rounded text-center text-lg xl:text-3xl px-3 py-6 bg-gray-200 group-hover:shadow-lg">
        {name}
      </div>
      <img
        src={thumbnail}
        alt=""
        className="object-cover rounded w-full h-full group-hover:shadow-lg"
      />
    </div>
  );
};
