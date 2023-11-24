import { FC } from 'react';

export type DividerProps = {
  color?: string;
  width?: 'full' | 'half' | 'third' | 'quarter';
};

const widthMap = {
  full: '100%',
  half: '50%',
  third: '33%',
  quarter: '25%',
};

const Divider: FC<DividerProps> = ({ color = 'gray', width = 'full' }) => {
  return (
    <div className="w-full flex justify-center">
      <div
        className="h-[1px]"
        style={{
          background: color,
          width: widthMap[width],
        }}
      ></div>
    </div>
  );
};

export default Divider;
