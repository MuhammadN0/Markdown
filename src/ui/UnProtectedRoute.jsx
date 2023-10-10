import { useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function UnProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (currentUser) navigate('/');
    },
    [currentUser, navigate]
  );
  return children;
}

export default UnProtectedRoute;
