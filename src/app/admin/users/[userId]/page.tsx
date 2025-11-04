import { deleteUser, getUser } from '@/app/actions/users';
import Link from 'next/link';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';

type PageProps = Promise<{
    userId: string;
}>

export default async function Page(params: PageProps) {
  const { userId } = await params;
  if (!userId) {
    return <div>User not found</div>;
  }

  const user = await getUser(userId);

  if (!user) {
    return <div>User not found</div>;
  }

  const handleDelete = async () => {
    await deleteUser(user.uid);
  };

  return (
    <div>
      <h1>User Details</h1>
      <p>UID: {user.uid}</p>
      <p>Email: {user.email}</p>
      <p>Display Name: {user.displayName}</p>
      <p>Photo URL: {user.photoURL}</p>
      <p>Disabled: {user.disabled ? 'Yes' : 'No'}</p>
      <Link href={`/admin/users/${user.uid}/edit`}>Edit</Link>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              user and remove their data from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDelete} asChild>
              <Button variant="destructive">Yes, Delete</Button>
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
