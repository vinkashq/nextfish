'use client';

import { User } from '@/types';
import { useState, useEffect } from 'react';
import { listUsers, deleteUser } from '@/app/actions/users';
import Link from 'next/link';

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    listUsers().then(({ users, nextPageToken }) => {
      setUsers(users);
      setNextPageToken(nextPageToken);
    });
  }, []);

  const handleDelete = async (uid: string) => {
    await deleteUser(uid);
    setUsers(users.filter((user) => user.uid !== uid));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>UID</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td>{user.uid}</td>
              <td>{user.email}</td>
              <td>
                <Link href={`/admin/users/${user.uid}`}>View</Link>
                <Link href={`/admin/users/${user.uid}/edit`}>Edit</Link>
                <button onClick={() => handleDelete(user.uid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {nextPageToken && (
        <button
          onClick={() => {
            listUsers(nextPageToken).then(({ users, nextPageToken }) => {
              setUsers((prevUsers) => [...prevUsers, ...users]);
              setNextPageToken(nextPageToken);
            });
          }}
        >
          Load more
        </button>
      )}
    </div>
  );
}
