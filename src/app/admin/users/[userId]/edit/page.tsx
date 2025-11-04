import { getUser } from '@/app/actions/users';
import EditUserForm from './edit-user-form';

type PageProps = Promise<{
    userId: string;
}>

export default async function Page({ params }: { params: { userId: string } }) {
  const { userId } = await params;
  if (!userId) {
    return <div>User not found</div>;
  }

  const user = await getUser(userId);

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
