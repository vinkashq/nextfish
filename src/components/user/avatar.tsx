import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { User } from "firebase/auth";

export default function UserAvatar({
  user,
}: {
  user: User
}) {
  if (!user) return null

  const initials = (user.displayName || user.email).slice(0, 2).toUpperCase()
  return (
    <Avatar className="h-8 w-8 rounded-full">
      <AvatarImage src={user.photoURL} alt={user.displayName} />
      <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
    </Avatar>
  )
}
