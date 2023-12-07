import { ICategoryModel } from '@/services/category.service';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export type CategoryLabelProps = {
  color?:
    | 'purple'
    | 'red'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'indigo'
    | 'pink'
    | 'gray'
    | 'white'
    | 'black';

  category: ICategoryModel;
};

const CategoryLabel: FC<CategoryLabelProps> = ({ category }) => {
  return (
    <div className="flex gap-3">
      <Link to={`/category/${category.slug}`}>
        <div className="text-blue-500 font-semibold text-xs leading-none pt-2">{category.name}</div>
      </Link>
    </div>
  );
};

export default CategoryLabel;
