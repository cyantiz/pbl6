import { ICategoryModel } from '@api/category.api';
import { FC } from 'react';

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
      <div>
        <div className="text-blue-500 font-semibold text-xs leading-none pt-2">{category.name}</div>
      </div>
    </div>
  );
};

export default CategoryLabel;
