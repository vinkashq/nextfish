import { getUser } from '@/app/actions/users';
import Link from 'next/link';

export default async function Page({ params }: { params: { userId: string } }) {
  const user = await getUser(params.userId);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>UID: {user.uid}</p>
      <p>Email: {user.email}</p>
      <p>Display Name: {user.displayName}</p>
      <p>Photo URL: {user.photoURL}</p>
      <p>Disabled: {user.disabled ? 'Yes' : 'No'}</p>
      <Link href={`/admin/users/${user.uid}/edit`}>Edit</Link>
      <button>Delete</button>
    </div>
  );
}
