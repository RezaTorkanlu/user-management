import UserListContainer from "@/container/UserListContainer";


export default function Home() {
  return (
    <>
      <h2 className="flex justify-center text-2xl font-semibold mt-5 max-sm:text-xl max-sm:text-center ">
        Hello And Wellcome To My Project
      </h2>
      <UserListContainer  />
    </>
  );
}
