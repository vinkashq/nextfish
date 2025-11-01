import { deleteUser, getUser } from '@/app/actions/users';
import Link from 'next/link';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';

export default async function Page({ params }: { params: { userId: string } }) {
  const user = await getUser(params.userId);

  const handleDelete = async (uid: string) => {
    await deleteUser(uid);
  };

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
            <AlertDialogAction onClick={() => handleDelete(user.uid)} asChild>
              <Button variant="destructive">Yes, Delete</Button>
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
