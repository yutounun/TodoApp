import supabase from "./supabaseClient";

export async function fetchTodos() {
  const { data, error } = await supabase.from("todos").select("*");
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return { data, error };
}

export async function createTodo(label) {
  const { data, error } = await supabase
    .from("todos")
    .insert({ label })
    .select();
  return { data: data[0], error };
}

export async function updateTodo(id, label) {
  const { data, error } = await supabase
    .from("todos")
    .update({ label })
    .eq("id", id);
  return { data, error };
}

export async function deleteTodo(id) {
  const { data, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .select();
  return { data, error };
}
