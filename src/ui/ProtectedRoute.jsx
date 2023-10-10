import { useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!currentUser) navigate('/login');
    },
    [currentUser, navigate]
  );
  return children;
}

export default ProtectedRoute;
