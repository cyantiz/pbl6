import { FC } from 'react';

export type DividerProps = {
  color?: string;
};

const Divider: FC<DividerProps> = ({ color = 'gray' }) => {
  return (
    <div
      className="w-full h-[1px]"
      style={{
        background: color,
      }}
    ></div>
  );
};

export default Divider;
