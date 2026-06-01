import { useEffect, useState } from 'react';
import * as adminService from '../services/admin';

const roles = ['student', 'freelancer', 'admin'];

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { users: fetchedUsers } = await adminService.getUsers(roleFilter ? { role: roleFilter } : undefined);
      setUsers(fetchedUsers);
    } catch (err) {
      setError('Unable to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, [roleFilter]);

  const updateUserState = (id: string, updates: Record<string, unknown>) => {
    setUsers((current) => current.map((user) => (user._id === id ? { ...user, ...updates } : user)));
  };

  const handleToggleActive = async (user: any) => {
    try {
      const { user: updated } = await adminService.updateUser(user._id, { isActive: !user.isActive });
      updateUserState(user._id, { isActive: updated.isActive });
    } catch (err) {
      setError('Unable to update account status.');
    }
  };

  const handleVerification = async (user: any) => {
    try {
      const { user: updated } = await adminService.updateUser(user._id, { isVerified: !user.isVerified });
      updateUserState(user._id, { isVerified: updated.isVerified });
    } catch (err) {
      setError('Unable to update verification state.');
    }
  };

  const handleRoleChange = async (user: any, role: string) => {
    try {
      const { user: updated } = await adminService.updateUser(user._id, { role });
      updateUserState(user._id, { role: updated.role });
    } catch (err) {
      setError('Unable to change role.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Admin users</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">User management</h2>
          <p className="mt-2 text-sm text-slate-600">Review and update roles, verification, and account status.</p>
        </div>
        <div className="space-y-2 md:space-y-0 md:flex md:items-center md:gap-3">
          <label className="text-sm font-medium text-slate-700">Filter by role</label>
          <select
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-sm"
          >
            <option value="">All roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Verified</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td className="px-6 py-10 text-sm text-slate-500" colSpan={6}>
                  Loading users…
                </td>
              </tr>
            ) : users.length ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4">{user.fullName}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(event) => handleRoleChange(user, event.target.value)}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">{user.isVerified ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4">{user.isActive ? 'Active' : 'Disabled'}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleToggleActive(user)}
                      className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-800 transition hover:bg-slate-200"
                    >
                      {user.isActive ? 'Disable' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleVerification(user)}
                      className="rounded-full bg-indigo-600 px-4 py-2 text-sm text-white transition hover:bg-indigo-700"
                    >
                      {user.isVerified ? 'Unverify' : 'Verify'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-10 text-sm text-slate-500" colSpan={6}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
