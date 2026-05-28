import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';
import RoleSelector from '../components/RoleSelector';

const Signup = () => {
  const { signup, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'student' | 'freelancer'>('student');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();

    const user = await signup({ fullName, email, password, confirmPassword, role });
    if (user) {
      const redirectPath = user.role === 'freelancer' ? '/freelancer' : user.role === 'admin' ? '/admin' : '/student';
      navigate(redirectPath);
    }
  };

  return (
    <AuthForm title="Create Account" description="Start your Edulance AI journey." submitLabel="Create account" onSubmit={handleSubmit}>
      {error && <Alert message={error} />}
      <label className="block text-sm font-medium text-slate-700">
        Full name
        <input
          type="text"
          value={fullName}
          onChange={(e) => {
            clearError();
            setFullName(e.target.value);
          }}
          required
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => {
            clearError();
            setEmail(e.target.value);
          }}
          required
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => {
            clearError();
            setPassword(e.target.value);
          }}
          required
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Confirm password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            clearError();
            setConfirmPassword(e.target.value);
          }}
          required
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </label>
      <RoleSelector role={role} onChange={(value) => setRole(value)} />
      {isLoading && <LoadingSpinner />}
    </AuthForm>
  );
};

export default Signup;
