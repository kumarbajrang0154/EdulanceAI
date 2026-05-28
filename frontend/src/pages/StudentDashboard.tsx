import { Navigate } from 'react-router-dom';

const StudentDashboard = () => {
  // Redirect to the dashboard home page
  return <Navigate to="/student/dashboard" replace />;
};

export default StudentDashboard;
