import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();

    const user = await login(email, password);
    if (user) {
      const redirectPath = user.role === 'freelancer' ? '/freelancer' : user.role === 'admin' ? '/admin' : '/student';
      navigate(redirectPath);
    }
  };

  return (
    <AuthForm title="Login" description="Access your Edulance AI dashboard." submitLabel="Sign in" onSubmit={handleSubmit}>
      {error && <Alert message={error} />}
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
      {isLoading && <LoadingSpinner />}
    </AuthForm>
  );
};

export default Login;
