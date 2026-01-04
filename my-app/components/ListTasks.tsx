"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { toast } from "sonner";
interface Task {
  selected: boolean;
  task: string;
}
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;
interface IProps extends React.PropsWithChildren {
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  state: Task[];
  action: (task: string,isBulk: boolean) => Promise<void>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export function ListTasks({
  setLoaded: setItemsLoaded,
  state,
  action,
  open,
  setOpen,
}: IProps) {
  const [loaded, setLoaded] = useState<boolean>(true);
  const handleSubmit = async (formdata: FormData) => {
    setLoaded(false);
    let selectedTasks = [];
    for (let i = 0; i < state.length; ++i) {
      const isSelected = formdata.get(`selected-${i}`);
      const taskName = formdata.get(`task-${i}`) as string;
      if (isSelected === "on") {
        selectedTasks.push(taskName);
      }
    }
    await Promise.all(
      selectedTasks.map((task: string) => {
        return action(task,true);
      })
    );
    toast.success("Tasks Added Successfully!");
    setOpen(false);
    setItemsLoaded(false);
    setLoaded(true);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tasks Recommended By AI</DialogTitle>
            <DialogDescription>
              Select Tasks You Want To Add. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea>
            <div className="grid gap-4 max-h-[400px] py-5 px-5">
              {state.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 justify-between"
                  >
                    <Checkbox
                      name={`selected-${idx}`}
                      defaultChecked={item.selected}
                    />
                    <Input
                      name={`task-${idx}`}
                      className="bg-transparent! border-0!"
                      defaultValue={item.task}
                    />
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={loaded === false}>Add Tasks</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
