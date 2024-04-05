"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import WorkCard from "@/components/WorkCard";
import { SingleImageDropzoneUsage } from "./Imageupload";
import { BsFileEarmarkPlus } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@clerk/nextjs";

interface Work {
  id: string;
  name: string;
  brief: string;
  link: string;
  imageUrl: string;
}

const WorksManagementSection = () => {
  const { userId } = useAuth();
  const [works, setWorks] = useState<Work[]>([]);
  const [newWork, setNewWork] = useState<Partial<Work>>({
    id: Date.now().toString(),
    name: "",
    brief: "",
    link: "",
    imageUrl: "",
  });
  const user = userId;
  useEffect(() => {
    getWorkfromPortfolio(user).then((res: Work[]) => {
      console.log(res);
      setWorks(res);
    });
  }, []);

  const handleAddWork = () => {
    if (newWork.name && newWork.brief && newWork.link && newWork.imageUrl) {
      setWorks([...works, newWork as Work]);
      saveWorkToPortfolio(newWork as Work);
      getWorkfromPortfolio(user).then((res: Work[]) => {
        console.log(res);
        setWorks(res);
      });
      setNewWork({
        id: Date.now().toString(),
        name: "",
        brief: "",
        link: "",
        imageUrl: "",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewWork((prevNewWork) => ({
      ...prevNewWork,
      [name]: value,
    }));
  };

  const handleUploadResponse = (response: any) => {
    setNewWork((prevNewWork) => ({
      ...prevNewWork,
      imageUrl: response.url,
    }));
  };

  const saveWorkToPortfolio = async (workData: Work) => {
    try {
      const userId = user;
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...workData, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to save work to portfolio");
      }
      console.log(response.json());

      return await response.json();
    } catch (error: any) {
      console.error(error);
      return { error: error.message || "Failed to save work to portfolio" };
    }
  };

  const getWorkfromPortfolio = async (userid: any) => {
    try {
      const response = await fetch("/api/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to get work from portfolio");
      }

      const portfolios = await response.json();
      const works = portfolios.map((portfolio: any) => portfolio.works).flat();
      return works;
    } catch (error: any) {
      console.error(error);
      return { error: error.message || "Failed to get work from portfolio" };
    }
  };

  return (
    <>
      <div className="flex flex-col p-10 gap-2 ">
        <h3 className="text-4xl font-bold mb-4 text-center items-center justify-center">
          Your Works
        </h3>
        <div className="flex flex-col gap-4">
          <Dialog>
            <DialogTrigger>
              <Button
                variant={"outline"}
                className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
              >
                <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
                <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
                  Add a new Writing
                </p>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form action="">
                <DialogHeader>
                  <DialogTitle>
                    <h2 className="text-2xl font-bold mb-4">
                      Manage Your Works
                    </h2>
                  </DialogTitle>
                  <DialogDescription>
                    <h3 className="text-lg font-bold mb-2">Add New Work</h3>
                  </DialogDescription>
                </DialogHeader>
                <div className="container mx-auto px-4 py-8">
                  <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SingleImageDropzoneUsage
                        onUploadResponse={handleUploadResponse}
                      />
                      <div className="flex flex-col gap-2">
                        <Input
                          name="name"
                          placeholder="Work Name"
                          value={newWork.name}
                          onChange={handleInputChange}
                        />
                        <Textarea
                          name="brief"
                          placeholder="Work Brief"
                          value={newWork.brief}
                          onChange={handleInputChange}
                        />
                        <Input
                          name="link"
                          placeholder="Work Link"
                          type="url"
                          value={newWork.link}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={handleAddWork} className="mt-4 w-full">
                      Add Work
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </>
  );
};

export default WorksManagementSection;
