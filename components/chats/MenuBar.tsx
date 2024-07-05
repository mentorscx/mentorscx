import { UserButton } from "@clerk/nextjs";
import { Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

type MenuBarProps = {
  onUserMenuClick: () => void;
  userName: string | null;
  userImage: string;
};

export default function MenuBar(props: MenuBarProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-e border-e-[#DBDDE1] bg-white p-3">
      <div className="flex items-center gap-2 justify-start">
        <Avatar>
          <AvatarImage src={props.userImage} />
          {props.userName && (
            <AvatarFallback>{getInitials(props.userName)}</AvatarFallback>
          )}
        </Avatar>
        <p className="font-semibold">{props.userName}</p>
      </div>
      <div className="flex gap-6">
        <span title="Show users">
          <Users className="cursor-pointer" onClick={props.onUserMenuClick} />
        </span>
      </div>
    </div>
  );
}
