import { ICategoryModel, getAllCategories } from '@api/category.api';
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
    <>
      <Banner />

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
    </>
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
        'flex sm:flex-[50%] xl:flex-[33%] p-2 cursor-pointer duration-300 group',
        reverse ? 'flex-col' : 'flex-col-reverse',
      )}
      onClick={onClick}
    >
      <div className="uppercase font-black rounded text-center text-lg xl:text-2xl px-3 py-6 bg-gray-200 group-hover:shadow-lg">
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

const Banner: FC = ({}) => {
  return (
    <div className="rounded flex flex-col md:flex-row mb-4 items-center justify-between mt-6 relative bg-gradient-to-r from-[#303030] via-green-500 to-green-400 mx-2">
      <div className=" layout flex flex-col max-w-[586px] py-6 px-8">
        <span className="font-playfair title text-white font-bold text-3xl mb-2">Categories</span>
        <span className="text-white font-playfair">
          We have a lot of categories for you to choose from, here they are!
        </span>
      </div>
      <div className="md:max-w-[400px] h-full">
        <img
          src="https://img.vietcetera.com/uploads/images/assets/user-need/opinion.png"
          alt=""
          className="block w-full h-full"
        />
      </div>
    </div>
  );
};
