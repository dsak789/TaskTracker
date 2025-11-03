import { useQuery } from "@tanstack/react-query";
import { getTasks, TaskTypes } from "../services";
import { useAuth } from "./useAuth";

export const useFetch = (type: TaskTypes) => {
  const { state } = useAuth();
  return useQuery({
    queryKey: [type, state.user?.username],
    queryFn: () => getTasks(type),
    staleTime: 1000 * 60 * 15,
  });
};
