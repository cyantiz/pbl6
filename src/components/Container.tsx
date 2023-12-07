import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
export type ContainerProps = {
  large?: boolean;
  alt?: boolean;
  className?: string;
};

const Container: FC<PropsWithChildren<ContainerProps>> = ({ large, alt, className, children }) => {
  return (
    <div
      className={classNames(
        'px-8 mx-auto xl:px-5',
        large ? 'max-w-screen-2xl' : 'max-w-screen-lg',
        !alt && 'py-5 lg:py-8',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
