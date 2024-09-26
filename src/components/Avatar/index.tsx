import useActiveList from "@hooks/useActiveList";
import { User } from "@prisma/client";
import Image from "next/image";

interface Props {
  user: User;
}

function Avatar({
  user,
}: Props) {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email ?? '') !== -1;

  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden w-9 h-9 md:w-11 md:h-11">
        <Image
          alt="Avatar"
          src={user?.image || "/images/placeholder.png"}
          fill
        />
      </div>
      {isActive && <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 w-2 h-2 md:w-3 md:h-3" />}
    </div>
  );
}

export default Avatar;