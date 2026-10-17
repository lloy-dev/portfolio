import { useMutation } from "@tanstack/react-query";
import type { LikeProjectInput } from "portfolio-core";
import { useServices } from "@hooks";

const useLikeProject = () => {
  const { portfolioService } = useServices();

  const likeProjectMutation = useMutation({
    mutationKey: ["likeProject"],
    mutationFn: (data: LikeProjectInput) => portfolioService.likeProject(data),
  });

  return { likeProjectMutation };
};

export default useLikeProject;
