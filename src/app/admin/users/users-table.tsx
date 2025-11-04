'use client';

import { User } from '@/types';
import { useState, useEffect } from 'react';
import { listUsers } from '@/app/actions/users';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';

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

  const handleLoadMore = (token?: string) => {
    listUsers(token).then(({ users, nextPageToken }) => {
      setUsers((prevUsers) => [...prevUsers, ...users]);
      setNextPageToken(nextPageToken);
    });
  };

  return (
    <DataTable
      columns={columns()}
      data={users}
      nextPageToken={nextPageToken}
      onLoadMore={handleLoadMore}
    />
  );
}
