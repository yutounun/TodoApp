import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Todo } from "../types/todo";
import supabase from "./supabaseClient";

export async function fetchTodos() {
  const { data, error }: PostgrestSingleResponse<Todo[]> = await supabase
    .from("todos")
    .select("*");
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return { data, error };
}

export async function createTodo(label: string) {
  const { data, error }: PostgrestSingleResponse<Todo[]> = await supabase
    .from("todos")
    .insert({ label })
    .select();
  return { data: data?.[0], error };
}

export async function updateTodo(id: number, label: string) {
  const { data, error } = await supabase
    .from("todos")
    .update({ label })
    .eq("id", id);
  return { data, error };
}

export async function deleteTodo(id: number) {
  const { data, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .select();
  return { data, error };
}

export async function completeTodo(id: number) {
  console.log("🚀 ~ id:", id);
  const { data, error } = await supabase
    .from("todos")
    .update({ completed: true })
    .eq("id", id)
    .select();
  return { data, error };
}

export async function uncompleteTodo(id: number) {
  const { data, error } = await supabase
    .from("todos")
    .update({ completed: false })
    .eq("id", id)
    .select();
  return { data, error };
}
