import UserListContainer from "@/container/UserListContainer";
import { User } from "@/types/users";

type Props = {
  initialUsers : User[]
}

export default function Home({ initialUsers }: Props) {
  return (
    <>
      <h2 className="flex justify-center text-2xl font-semibold mt-5 max-sm:text-xl max-sm:text-center ">
        Hello And Wellcome To My Project
      </h2>
      <UserListContainer initialUsers={initialUsers} />
    </>
  );
}
