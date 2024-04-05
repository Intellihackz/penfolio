import Image from "next/image";

interface WorkCardProps {
  work: {
    id: string;
    name: string;
    brief: string;
    link: string;
    imageUrl: string;
  };
}

const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={work.imageUrl}
          alt={work.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{work.name}</h3>
        <p className="text-gray-600 mb-4">{work.brief}</p>
        <a
          href={work.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Edit
        </a>
      </div>
    </div>
  );
};

export default WorkCard;
