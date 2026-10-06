import { useQuery } from "@tanstack/react-query";
import { useLikeProject, useServices } from "@hooks";
import { useNavigate } from "react-router";
import { useState } from "react";
import { STRG_LIKED_PROJECTS } from "@constants";

const useProjectsPage = () => {
  const navigate = useNavigate();
  const { portfolioService } = useServices();

  const [likedProjects, setLikedProjects] = useState<string[]>(() => {
    const cachedLikedProjects = localStorage.getItem(STRG_LIKED_PROJECTS);
    if (cachedLikedProjects) {
      const parsed: string[] = JSON.parse(cachedLikedProjects);
      return parsed;
    }
    return [];
  });

  const { data: portfolioDetailsData, isPending: portfolioDetailsPending } =
    useQuery({
      queryKey: ["portfolioDetails"],
      queryFn: () => portfolioService.getPortfolioDetails(),
    });
  const portfolioId = portfolioDetailsData?.id;

  const {
    data: projetsData,
    isPending: projectsIsPending,
    refetch: projectsRefetch,
  } = useQuery({
    queryKey: ["portfolioProjects", portfolioId],
    queryFn: () => {
      if (portfolioId)
        return portfolioService.getPortfolioProjects(portfolioId);
    },
    enabled: Boolean(portfolioId),
  });
  const projectsNotReady = portfolioDetailsPending || projectsIsPending;

  const {
    likeProjectMutation: { mutate: likeProjectMutate },
  } = useLikeProject();

  const handleLikeClick = (id: string) => {
    if (portfolioDetailsData) {
      setLikedProjects((prev) => {
        const newLiked = [...prev, id];
        localStorage.setItem(STRG_LIKED_PROJECTS, JSON.stringify(newLiked));
        return newLiked;
      });
      likeProjectMutate(
        { portfolioId: portfolioDetailsData?.id, projectId: id },
        {
          onSuccess: (res) => {
            if (res) {
              projectsRefetch();
            } else {
              setLikedProjects((prev) => {
                const newLiked = [...prev].filter((e) => e !== id);
                localStorage.setItem(
                  STRG_LIKED_PROJECTS,
                  JSON.stringify(newLiked),
                );
                return newLiked;
              });
            }
          },
          onError: () => {
            setLikedProjects((prev) => {
              const newLiked = [...prev].filter((e) => e !== id);
              localStorage.setItem(
                STRG_LIKED_PROJECTS,
                JSON.stringify(newLiked),
              );
              return newLiked;
            });
          },
        },
      );
    }
  };

  const handleProjectActionClick = (id: string) => () => {
    navigate(id);
  };

  return {
    likedProjects,
    portfolioDetailsData,
    projetsData,
    projectsNotReady,
    handleLikeClick,
    handleProjectActionClick,
  };
};

export default useProjectsPage;
