import ProfileCard from "./profile-card";

interface ProfileListProps {
  users: string;
}

export default async function ProfileList({ users }: ProfileListProps) {
  const parsedUsers = JSON.parse(users);

  return (
    <section className="max-w-[1100px] mx-3 md:mx-6">
      {parsedUsers.map((user: any) => (
        <ProfileCard key={user.id} user={JSON.stringify(user)} />
      ))}
    </section>
  );
}
