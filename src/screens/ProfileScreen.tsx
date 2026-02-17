import React, { useEffect, useState } from 'react';
import { FaKey, FaTrash, FaPen, FaCheck, FaTimes, FaPlus } from 'react-icons/fa';
import { useAuthStore } from '@stores';
import { PageHero, Loading, Message } from '@components';
import { PasskeyCredential } from '@types';

const PasskeyRow: React.FC<{
  passkey: PasskeyCredential;
  onDelete: (id: string) => void;
  onRename: (id: string, name: string) => void;
}> = ({ passkey, onDelete, onRename }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(passkey.name);

  const save = () => {
    const trimmed = name.trim();
    if (trimmed && trimmed !== passkey.name) {
      onRename(passkey._id, trimmed);
    } else {
      setName(passkey.name);
    }
    setEditing(false);
  };

  const cancel = () => {
    setName(passkey.name);
    setEditing(false);
  };

  return (
    <div className="flex items-center gap-3 py-3 border-b border-grey-9 last:border-b-0">
      <div className="w-9 h-9 rounded-full bg-primary-5/10 text-primary-5 flex items-center justify-center shrink-0">
        <FaKey className="text-xs" />
      </div>
      <div className="flex-1 min-w-0">
        {editing ? (
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') save();
                if (e.key === 'Escape') cancel();
              }}
              autoFocus
              className="text-sm border border-grey-8 rounded px-2 py-1 outline-none focus:border-primary-5 w-full max-w-48"
            />
            <button
              type="button"
              onClick={save}
              className="text-green-600 bg-transparent border-none cursor-pointer p-1"
              aria-label="Save"
            >
              <FaCheck className="text-xs" />
            </button>
            <button
              type="button"
              onClick={cancel}
              className="text-grey-5 bg-transparent border-none cursor-pointer p-1"
              aria-label="Cancel"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium mb-0 truncate">{passkey.name}</p>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-grey-6 hover:text-primary-5 bg-transparent border-none cursor-pointer p-1 shrink-0"
              aria-label="Rename"
            >
              <FaPen className="text-[0.6rem]" />
            </button>
          </div>
        )}
        <p className="text-xs text-grey-5 mb-0 mt-0.5">
          {passkey.deviceType === 'multiDevice' ? 'Synced' : 'Device-bound'}
          {passkey.backedUp && ' · Backed up'}
          {' · '}
          {new Date(passkey.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onDelete(passkey._id)}
        className="text-grey-5 hover:text-red-dark bg-transparent border-none cursor-pointer p-1.5 shrink-0"
        aria-label="Delete passkey"
      >
        <FaTrash className="text-xs" />
      </button>
    </div>
  );
};

const ProfileScreen: React.FC = () => {
  const {
    userInfo,
    passkeys,
    passkeysLoading,
    passkeyLoading,
    passkeyError,
    fetchPasskeys,
    registerPasskey,
    deletePasskey,
    renamePasskey,
  } = useAuthStore();

  useEffect(() => {
    fetchPasskeys();
  }, [fetchPasskeys]);

  const handleAddPasskey = async () => {
    await registerPasskey();
    const { passkeyError: err } = useAuthStore.getState();
    if (!err) {
      fetchPasskeys();
    }
  };

  return (
    <main>
      <PageHero title="profile" />
      <div className="page">
        <section className="section-center py-8">
          {/* Account Info */}
          <div className="border border-grey-8 rounded-lg p-5 sm:p-6 mb-6">
            <h4 className="mb-4 capitalize">account</h4>
            <div className="mb-3">
              <p className="text-xs text-grey-5 mb-0.5">Name</p>
              <p className="text-sm font-medium mb-0 capitalize">{userInfo?.username || 'User'}</p>
            </div>
            <div>
              <p className="text-xs text-grey-5 mb-0.5">Email</p>
              <p className="text-sm mb-0">{userInfo?.email}</p>
            </div>
          </div>

          {/* Passkeys */}
          <div className="border border-grey-8 rounded-lg p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="mb-0 capitalize">passkeys</h4>
              <button
                type="button"
                onClick={handleAddPasskey}
                disabled={passkeyLoading}
                className="flex items-center gap-1.5 text-sm text-primary-5 font-medium bg-transparent border-none cursor-pointer hover:underline disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <FaPlus className="text-[0.6rem]" />
                {passkeyLoading ? 'Adding...' : 'Add Passkey'}
              </button>
            </div>

            {passkeyError && (
              <div className="mb-4">
                <Message type="error">{passkeyError}</Message>
              </div>
            )}

            {passkeysLoading ? (
              <Loading />
            ) : passkeys.length === 0 ? (
              <p className="text-sm text-grey-5 mb-0">
                No passkeys registered. Add one for passwordless sign-in.
              </p>
            ) : (
              <div>
                {passkeys.map((pk) => (
                  <PasskeyRow
                    key={pk._id}
                    passkey={pk}
                    onDelete={deletePasskey}
                    onRename={renamePasskey}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfileScreen;
