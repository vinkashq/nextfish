import { getUser } from '@/app/actions/users';
import EditUserForm from './edit-user-form';

export default async function Page({ params }: { params: { userId: string } }) {
  const user = await getUser(params.userId);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>Edit User</h1>
      <EditUserForm user={user} />
    </div>
  );
}
