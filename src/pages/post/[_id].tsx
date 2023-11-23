import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

type Props = {};

export default function PostPage({}: Props) {
  const { _id } = useParams();

  const id = useMemo(() => {
    try {
      if (!_id) return null;

      return isNaN(+_id) ? null : +_id;
    } catch (error) {
      return null;
    }
  }, [_id]);

  return <div>Article #{id}</div>;
}
