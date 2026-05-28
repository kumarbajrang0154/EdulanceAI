import { ReactNode } from 'react';

type AuthFormProps = {
  title: string;
  description: string;
  submitLabel: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

const AuthForm = ({ title, description, submitLabel, onSubmit, children }: AuthFormProps) => (
  <div className="mx-auto max-w-xl rounded-[28px] border border-slate-200 bg-white p-10 shadow-sm shadow-slate-100">
    <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
    <p className="mt-2 text-sm text-slate-600">{description}</p>
    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
      {children}
      <button
        type="submit"
        className="w-full rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        {submitLabel}
      </button>
    </form>
  </div>
);

export default AuthForm;
