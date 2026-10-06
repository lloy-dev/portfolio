import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { NAV_PATHS, STRG_LIKED_PROJECTS } from "@constants";
import { useGetPortfolioDetails, useLikeProject, useServices } from "@hooks";

const useHomePage = () => {
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

  const { portfolioDetailsQuery, userDetails } = useGetPortfolioDetails();
  const { data: portfolioDetailsData, isPending: portfolioDetailsPending } =
    portfolioDetailsQuery;
  const portfolioId = portfolioDetailsData?.id;

  const {
    data: featuredItemsData,
    isPending: featuredItemsIsPending,
    refetch: featuredItemsRefetch,
  } = useQuery({
    queryKey: ["portfolioFeaturedItems", portfolioId],
    queryFn: () => {
      if (portfolioId)
        return portfolioService.getPortfolioFeaturedItems(portfolioId);
      return null;
    },
    enabled: Boolean(portfolioId),
  });
  const featuredItemsNotReady =
    portfolioDetailsPending || featuredItemsIsPending;

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
              featuredItemsRefetch();
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

  const handleSeeMoreExperienceClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(NAV_PATHS.EXPERIENCE.BASE);
  };

  const handleSeeMoreProjectsClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(NAV_PATHS.PROJECTS.BASE);
  };

  const handleProjectActionClick = (id: string) => () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`${NAV_PATHS.PROJECTS.BASE}/${id}`);
  };

  return {
    likedProjects,
    userDetails,
    portfolioDetailsData,
    featuredItemsData,
    featuredItemsNotReady,
    handleLikeClick,
    handleSeeMoreExperienceClick,
    handleSeeMoreProjectsClick,
    handleProjectActionClick,
  };
};

export default useHomePage;
