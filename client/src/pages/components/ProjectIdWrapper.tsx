import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import { fetchProjectIdByUser } from '../../../api/project-service';

const ProjectIdWrapper: React.FC<{ Component: React.FC<{ projectId: string }> }> = ({ Component }) => {
  const { projectId } = useParams<{ projectId?: string }>();
  const { user } = useAuthContext();
  const [fetchedProjectId, setFetchedProjectId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchId = async () => {
      const result = await fetchProjectIdByUser(user, projectId);
      setFetchedProjectId(result.projectId);
      setError(result.error);
    };

    fetchId();
  }, [projectId, user]);

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Error</h2>
        <p>{error}</p>
        <a href="/login">Log in again</a>
      </div>
    );
  }

  if (!fetchedProjectId) {
    return <div>Loading project...</div>;
  }

  return <Component projectId={fetchedProjectId} />;
};

export default ProjectIdWrapper;