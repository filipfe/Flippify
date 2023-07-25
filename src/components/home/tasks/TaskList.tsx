import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { supabase } from "../../../hooks/useAuth";
import { AuthContext } from "../../../context/AuthContext";
import Loader from "../../Loader";
import TaskRef from "./TaskRef";
import { Task } from "../../../types/task";

export default function TaskList() {
  const { user } = useContext(AuthContext);
  const [areLoading, setAreLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      setAreLoading(true);
      const { data } = await supabase
        .from("user_tasks")
        .select(
          "id, current_value, ...tasks(description, required_value, reward_points)"
        )
        .eq("user_id", user.id)
        .limit(3);
      setTasks((data as unknown as Task[]) || []);
      setAreLoading(false);
    }
    fetchTasks();
  }, [user.id]);

  return areLoading ? (
    <Loader />
  ) : (
    <View>
      {tasks.map((task) => (
        <TaskRef {...task} key={task.id} />
      ))}
    </View>
  );
}
