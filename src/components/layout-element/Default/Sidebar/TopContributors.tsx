import { ILimitedUserModel, getTopContributors } from '@/api/user.api';
import { Icon } from '@iconify/react';
import { FC, useEffect, useState } from 'react';
export type TopContributorsProps = {
  // Define your props here if needed
};

const TopContributors: FC<TopContributorsProps> = ({}) => {
  const [topContributors, setTopContributors] = useState<ILimitedUserModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cached = localStorage.getItem('topContributors');
        if (cached) {
          setTopContributors(JSON.parse(cached));
          return;
        }

        const res = await getTopContributors({ limit: 5 });

        if (JSON.stringify(res) !== cached) {
          localStorage.setItem('topContributors', JSON.stringify(res));
          setTopContributors(res);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <div className="__sidebar__top-contributors">
      <div className="__sidebar__top-contributors__title flex items-center gap-2 mb-4">
        <Icon icon="ph:shooting-star-duotone" className="text-lg text-yellow-500" />
        <div className="text-base uppercase font-bold text-blue-600">Thành viên nổi bật</div>
      </div>
      <div className="flex flex-col gap-2 ml-3">
        {topContributors.map((user, index) => (
          <div key={index} className="flex gap-3 items-center">
            <div className="avatar-container w-8 h-8 overflow-hidden rounded-full">
              <img className="w-full h-full object-cover" src={user.avatarUrl} alt="#" />
            </div>
            <span className="font-semibold text-sm">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContributors;
