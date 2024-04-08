import Image from "next/image";

import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface WorkCardProps {
  work: {
    id: string;
    name: string;
    brief: string;
    link: string;
    imageUrl: string;
  };
}

// const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <div className="relative h-48">
//         <Image
//           src={work.imageUrl}
//           alt={work.name}
//           fill
//           className="object-cover"
//         />
//       </div>
//       <div className="p-4">
//         <h3 className="text-lg font-bold mb-2">{work.name}</h3>
//         <p className="text-gray-600 mb-4">{work.brief}</p>
//         <a
//           href={work.link}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-500 hover:underline"
//         >
//           Edit
//         </a>
//       </div>
//     </div>
//   );
// };

// export default WorkCard;

export default function WorkCard({ work }: WorkCardProps) {
  return (
    <Card key="1" className="w-full max-w-xs rounded-lg overflow-hidden">
      <div className="aspect-[1.5]">
        <img
          alt={work.name}
          className="object-cover"
          height={400}
          src={work.imageUrl}
          style={{
            aspectRatio: "400/400",
            objectFit: "cover",
          }}
          width={400}
        />
      </div>
      <CardContent className="text-center p-5">
        <p className="font-semibold" id="3zv4ds9n7c8">
          {work.name}
        </p>
        <p className="text-sm text-gray-500">{work.brief}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button>
          <Link href={work.link}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
