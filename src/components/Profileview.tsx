import WorkCard from "@/components/WorkCard";

const ProfileView = ({ user }: any) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{user.username}</h1>
        <p className="text-gray-600">{user.bio}</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.portfolios.map((portfolio: any) => (
            <WorkCard key={portfolio._id} work={portfolio} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
