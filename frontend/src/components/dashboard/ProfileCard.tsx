import { useAuth } from '../../context/AuthContext';

interface ProfileCardProps {
  showEditButton?: boolean;
}

const ProfileCard = ({ showEditButton = false }: ProfileCardProps) => {
  const { user } = useAuth();

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Recently';

  return (
    <article className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-white text-xl font-bold">
              {user?.fullName?.[0]?.toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{user?.fullName}</h3>
            <p className="text-sm text-slate-600">{user?.email}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium capitalize">
                {user?.role}
              </span>
              <span className="text-xs text-slate-500">Joined {joinedDate}</span>
            </div>
          </div>
        </div>
        {showEditButton && (
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors">
            ✏️ Edit
          </button>
        )}
      </div>
    </article>
  );
};

export default ProfileCard;
