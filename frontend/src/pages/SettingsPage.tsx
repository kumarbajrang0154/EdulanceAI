import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout, DashboardHeader, SectionTitle } from '../components/dashboard';

const SettingsPage = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    twoFactorAuth: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader
          title="Settings"
          description="Manage your account preferences and settings"
        />

        {/* Account Settings */}
        <section>
          <SectionTitle title="Account Settings" description="Update your basic information" />
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-900">Full Name</label>
                <input
                  type="text"
                  value={user?.fullName || ''}
                  readOnly
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900">Role</label>
                <input
                  type="text"
                  value={user?.role || ''}
                  readOnly
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 capitalize"
                />
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Update Profile
              </button>
            </div>
          </article>
        </section>

        {/* Notification Preferences */}
        <section>
          <SectionTitle title="Notifications" description="Control how you receive notifications" />
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="space-y-4">
              {[
                {
                  key: 'emailNotifications' as const,
                  title: 'Email Notifications',
                  description: 'Receive updates and announcements via email',
                },
                {
                  key: 'pushNotifications' as const,
                  title: 'Push Notifications',
                  description: 'Get real-time notifications in your browser',
                },
                {
                  key: 'marketingEmails' as const,
                  title: 'Marketing Emails',
                  description: 'Receive emails about new features and updates',
                },
                {
                  key: 'twoFactorAuth' as const,
                  title: 'Two-Factor Authentication',
                  description: 'Enable 2FA for enhanced security',
                },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-4 border-b border-slate-200 last:border-b-0">
                  <div>
                    <h4 className="font-medium text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                  </div>
                  <button
                    onClick={() => handleToggle(item.key)}
                    className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
                      settings[item.key] ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings[item.key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* Privacy & Security */}
        <section>
          <SectionTitle title="Privacy & Security" description="Manage your security settings" />
          <article className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-4 border-b border-slate-200">
                <div>
                  <h4 className="font-medium text-slate-900">Change Password</h4>
                  <p className="text-sm text-slate-600 mt-1">Update your account password</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium">Change</button>
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <h4 className="font-medium text-slate-900">Session Management</h4>
                  <p className="text-sm text-slate-600 mt-1">Manage your active sessions</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium">Manage</button>
              </div>
            </div>
          </article>
        </section>

        {/* Danger Zone */}
        <section>
          <SectionTitle title="Danger Zone" />
          <article className="rounded-2xl border border-red-300 bg-red-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-red-900">Delete Account</h4>
                <p className="text-sm text-red-800 mt-1">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Delete Account
              </button>
            </div>
          </article>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
