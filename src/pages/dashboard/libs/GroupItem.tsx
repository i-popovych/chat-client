import { FC } from 'react';

import { Group } from '../../../entities/Group';

type Props = {
  group: Group;
  handleGroupClick: (groupId: number) => void;
};

export const GroupItem: FC<Props> = ({ group }) => {
  return <div className='text-lg hover:drop-shadow'>{group.group_name}</div>;
};
