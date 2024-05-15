import { FC } from 'react';

import { Group } from '../../../entities/Group';
import { GroupItem } from './GroupItem';

type Props = {
  groups: Group[];
  handleGroupClick: (group: Group) => void;
};

export const GroupsList: FC<Props> = ({ groups, handleGroupClick }) => {
  const renderGroups = () => {
    return groups.map((group, index) => (
      <GroupItem key={group.id} group={group} handleGroupClick={handleGroupClick} />
    ));
  };

  return <div className='max-w-[600px] w-full flex flex-col '>{renderGroups()}</div>;
};
