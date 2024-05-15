import { FC } from 'react';

import { Group } from '../../../entities/Group';

type Props = {
  group: Group;
  handleGroupClick: (groupId: number) => void;
};

export const GroupItem: FC<Props> = ({ group, handleGroupClick }) => {
  const onGroupSelect = () => {
    handleGroupClick(group.id);
  };

  return (
    <div className='text-lg hover:drop-shadow cursor-pointer' onClick={onGroupSelect}>
      {group.group_name}
    </div>
  );
};
