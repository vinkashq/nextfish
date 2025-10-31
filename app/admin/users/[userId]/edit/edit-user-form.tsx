'use client';

import { User } from '@/types';
import { useState } from 'react';
import { updateUser } from '@/app/actions/users';

export default function EditUserForm({ user }: { user: User }) {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [disabled, setDisabled] = useState(user.disabled);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUser(user.uid, {
      displayName,
      email,
      disabled,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="displayName">Display Name</label>
        <input
          type="text"
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="disabled">Disabled</label>
        <input
          type="checkbox"
          id="disabled"
          checked={disabled}
          onChange={(e) => setDisabled(e.target.checked)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
