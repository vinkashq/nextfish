'use server';

import { auth } from '@/firebase/server';
import { User } from '@/types';
import { revalidatePath } from 'next/cache';

export async function listUsers(
  nextPageToken?: string
): Promise<{ users: User[]; nextPageToken?: string }> {
  const listUsersResult = await auth.listUsers(1000, nextPageToken);
  const users: User[] = listUsersResult.users.map((user) => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    disabled: user.disabled,
  }));
  return {
    users,
    nextPageToken: listUsersResult.pageToken,
  };
}

export async function getUser(uid: string): Promise<User | null> {
  try {
    const userRecord = await auth.getUser(uid);
    return {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      disabled: userRecord.disabled,
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

export async function deleteUser(uid: string): Promise<void> {
  try {
    await auth.deleteUser(uid);
    revalidatePath('/admin/users');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

export async function updateUser(uid: string, user: Partial<User>): Promise<User | null> {
  try {
    const userRecord = await auth.updateUser(uid, user);
    revalidatePath(`/admin/users/${uid}`);
    revalidatePath(`/admin/users/${uid}/edit`);
    return {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      disabled: userRecord.disabled,
    };
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
}
