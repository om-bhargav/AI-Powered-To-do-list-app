"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useState, useEffect } from "react";
import { toast } from "sonner";
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;
interface Item {
  id: string;
  task: string;
  createdAt: Date;
}
interface Task {
  selected: boolean;
  task: string;
}
export default function useItems(): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  Item[],
  React.Dispatch<React.SetStateAction<Item[]>>,
  (taskName: string,isBulk: boolean) => Promise<void>,
  (id: string) => Promise<void>,
  (id: string, taskName: string) => Promise<void>,
  (summary: string) => Promise<void>,
  boolean,
  Task[],
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [summaryLoading, setSummaryLoading] = useState<boolean>(false);
  const [suggestedTasks, setSuggestedTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const { data } = useAuthStore();
  const addData = async (taskName: string, isBulk: boolean) => {
    const response = await fetch(`${BACKEND}/items/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid: data?.id, taskName }),
    });
    const resJson = await response.json();
    if (resJson.success) {
      if (isBulk === false) {
        toast.success(resJson.message);
      }
      setItems([...items, resJson.task]);
      return resJson.task;
    } else {
      if (isBulk === false) {
        toast.error(resJson.message);
      }
    }
    return undefined;
  };
  const deleteItem = async (id: string) => {
    const response = await fetch(`${BACKEND}/items/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid: data?.id, id: id }),
    });
    const resJson = await response.json();
    if (resJson.success) {
      toast.success(resJson.message);
      setItems(items.filter((item) => item.id !== id));
    } else {
      toast.error(resJson.message);
    }
  };
  const updateItem = async (id: string, taskName: string) => {
    const response = await fetch(`${BACKEND}/items/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: data?.id,
        id: id,
        data: { task: taskName },
      }),
    });
    const resJson = await response.json();
    if (resJson.success) {
      toast.success(resJson.message);
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, task: taskName } : item
        )
      );
    } else {
      toast.error(resJson.message);
    }
  };
  const itemsFromAI = async (summary: string) => {
    setSummaryLoading(true);
    const response = await fetch(`${BACKEND}/items/summary-from-ai`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary }),
    });
    const resJson: { success: boolean; message: string; data: string } =
      await response.json();
    if (resJson.success) {
      const tasks = JSON.parse(
        resJson.data.slice(
          resJson.data.indexOf("{"),
          resJson.data.lastIndexOf("}") + 1
        )
      )?.tasks.map((item: string) => ({ task: item, selected: false }));
      setSuggestedTasks(tasks);
      setOpen(true);
    } else {
      toast.error(resJson.message);
    }
    setSummaryLoading(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BACKEND}/items/all`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid: data?.id ?? "" }),
      });
      const resData = await response.json();
      if (resData.success) {
        setItems(resData.data as Item[]);
      }
      setLoaded(true);
    };
    fetchData();
  }, [data, loaded]);
  return [
    loaded,
    setLoaded,
    items,
    setItems,
    addData,
    deleteItem,
    updateItem,
    itemsFromAI,
    summaryLoading,
    suggestedTasks,
    open,
    setOpen,
  ];
}
