import { FC } from 'react';
import { MdGrid3X3 } from 'react-icons/md';

import { Group } from '../../../entities/Group';

type Props = {
  group: Group;
  handleGroupClick: (group: Group) => void;
};

export const GroupItem: FC<Props> = ({ group, handleGroupClick }) => {
  const onGroupSelect = () => {
    handleGroupClick(group);
  };

  return (
    <div
      className='flex gap-2 items-center text-lg hover:drop-shadow cursor-pointer group-item_hover'
      onClick={onGroupSelect}
    >
      <div>
        <MdGrid3X3 fill='white' />
      </div>
      <div className='group-name'>{group.group_name}</div>
    </div>
  );
};
