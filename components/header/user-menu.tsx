import { User } from "firebase/auth";
import UserAvatar from "../user/avatar";
import UserDropdownMenu from "../user/dropdown-menu";

export default function HeaderUserMenu({
  user,
}: {
  user: User
}) {
  return (
    <UserDropdownMenu user={user}>
      <div className="cursor-pointer">
        <UserAvatar user={user} />
      </div>
    </UserDropdownMenu>
  )
}
