import { useState } from 'react';

type RequestFormProps = {
  onSubmit: (message: string) => Promise<void>;
};

const RequestForm = ({ onSubmit }: RequestFormProps) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    if (!message.trim()) {
      setError('Please provide a message for your request.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(message.trim());
      setSuccess('Request sent successfully.');
      setMessage('');
    } catch (err) {
      setError('Unable to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
      <h2 className="text-xl font-semibold text-slate-900">Request this service</h2>
      <p className="mt-2 text-sm text-slate-600">Share your project brief and ask the freelancer to start the workflow.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Request message</span>
          <textarea
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            placeholder="Describe your goals, timeline and expected outcome"
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? 'Sending...' : 'Send request'}
        </button>
      </form>
    </section>
  );
};

export default RequestForm;
