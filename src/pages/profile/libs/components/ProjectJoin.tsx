import { useState } from 'react';

export const ProjectJoin = () => {
  const [isForm, setIsForm] = useState(false);
  const [projectId, setProjectId] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectId(e.target.value);
  };

  const onCreateBthClick = () => {
    setIsForm((prev) => !prev);
  };

  const onCreateProject = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <div>
      <div onClick={onCreateBthClick}>Join to the Project</div>
      {isForm && (
        <>
          <div>Project ID</div>
          <div>
            <input type='text' value={projectId} onChange={onChange} />
          </div>
          <div>
            <button onClick={onCreateProject}>JOIN</button>
          </div>
        </>
      )}
    </div>
  );
};
