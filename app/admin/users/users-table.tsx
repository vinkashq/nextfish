'use client';

import { User } from '@/types';
import { useState, useEffect } from 'react';
import { listUsers, deleteUser } from '@/app/actions/users';
import { columns } from './columns';
import { DataTable } from './data-table';

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

  const handleLoadMore = (token?: string) => {
    listUsers(token).then(({ users, nextPageToken }) => {
      setUsers((prevUsers) => [...prevUsers, ...users]);
      setNextPageToken(nextPageToken);
    });
  };

  return (
    <DataTable
      columns={columns(handleDelete)}
      data={users}
      nextPageToken={nextPageToken}
      onLoadMore={handleLoadMore}
    />
  );
}