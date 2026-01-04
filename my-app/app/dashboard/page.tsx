"use client";
import React, { useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { PlusCircle, Bot, Grid, UserCircle, Loader2,Pencil,Trash2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import useItems from "@/hooks/useItems";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import { EditTask } from "@/components/EditTask";
import { ListTasks } from "@/components/ListTasks";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
const dashboard = () => {
  const [loaded, setLoaded, items, setItems, addItem, removeItem, updateItem,tasksFromAI, summaryLoading,suggestedTasks,open,setOpen] = useItems();
  const { data } = useAuthStore();
  const [input, setInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [summary, setSummary] = useState("");
  return (
    <div className="my-10 flex-1 w-full flex justify-center items-center">
      <div className="max-w-[1200px] flex flex-col md:flex-row justify-between items-start gap-8 w-full p-5 md:p-3">
        <div className="w-full grid gap-4">
          <div className="font-semibold flex items-center justify-center gap-4 text-2xl text-center capitalize">
            <UserCircle size={25} />
            Welcome, {(data && data.name) || "Name will appear here"}
          </div>
          <Field>
            <FieldLabel htmlFor="item" className="text-lg font-semibold">
              <PlusCircle size={25} /> Add Task
            </FieldLabel>
            <div className="flex md:flex-row flex-col gap-3">
              <Input
                placeholder="Enter Item To Add"
                className="py-5 flex-1"
                type="text"
                maxLength={45}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button
                onClick={async () => {
                  await addItem(input,false);
                  setInput("");
                }}
              >
                Add
              </Button>
            </div>
          </Field>
          <Field>
            <FieldLabel htmlFor="item" className="text-lg font-semibold">
              <Bot size={25} /> Add Tasks With AI Analysis
            </FieldLabel>
            <div className="flex flex-col gap-3 min-h-[200px]">
              <Textarea
                placeholder="Enter Summary To Predict Items"
                className="flex-1 resize-none"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
              <Button onClick={async ()=>{
                await tasksFromAI(summary);
              }} disabled={summaryLoading}>Start Analysis</Button>
            </div>
            <ListTasks setLoaded={setLoaded} action={addItem} state={suggestedTasks} open={open} setOpen={setOpen}/>
          </Field>
        </div>
        <div className="w-full grid gap-4">
          <Field className="text-2xl font-semibold text-center">
            <div className="flex items-center justify-center gap-4">
              <Grid size={25} /> All Tasks
            </div>
          </Field>
          <div className="shadow-md flex border-1 rounded-md overflow-y-hidden! max-h-[340px]">
            <Table className="w-full h-full">
              <TableHeader className="sticky bg-background top-0">
                <TableRow className="border-b bg-black/10 hover:bg-black/10 dark:bg-black/90">
                  <TableHead className="text-center font-semibold">
                    #
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Task
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Created
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-hidden">
                {loaded ? (
                  <>
                    {items.map((data, idx) => {
                      return (
                        <TableRow key={data.id}>
                          <TableCell className="text-center text-sm font-semibold">
                            {idx + 1}
                          </TableCell>
                          <TableCell className="text-center font-semibold break-all text-sm capitalize whitespace-normal break-words max-w-[100px]">
                            {data.task}
                          </TableCell>
                          <TableCell className="text-center text-sm break-words whitespace-normal">
                            <ReactTimeAgo
                              date={data.createdAt}
                              locale="en-US"
                            />
                          </TableCell>
                          <TableCell
                            colSpan={2}
                            className="text-center h-full flex justify-center items-center"
                          >
                            <ButtonGroup>
                              <EditTask state={editInput} setState={setEditInput} action={async ()=>await updateItem(data.id,editInput)}>
                                <Button
                                  className="dark:bg-neutral-900! rounded-none rounded-l-lg"
                                  variant={"outline"}
                                  onClick={()=>setEditInput(data.task)}
                                >
                                  <Pencil className="md:hidden"/><div className="max-md:hidden">Edit</div>
                                </Button>
                              </EditTask>
                              <Button
                                onClick={() => removeItem(data.id)}
                                variant={"destructive"}
                              >
                                <Trash2 className="md:hidden"/><div className="max-md:hidden">Delete</div>
                              </Button>
                            </ButtonGroup>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {items.length === 0 && (
                      <TableRow className="text-center">
                        <TableCell colSpan={5}>No Tasks Added!</TableCell>
                      </TableRow>
                    )}
                  </>
                ) : (
                  <TableRow className="text-center">
                    <TableCell colSpan={5}>
                      <Loader2
                        className="self-center justify-self-center animate-spin"
                        size={30}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
