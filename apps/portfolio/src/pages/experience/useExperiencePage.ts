import { useGetPortfolioDetails, useServices } from "@hooks";
import { useQuery } from "@tanstack/react-query";

const useExperiencePage = () => {
  const { portfolioService } = useServices();

  const { portfolioDetailsQuery, userDetails } = useGetPortfolioDetails();
  const { data: portfolioDetailsData, isPending: portfolioDetailsPending } =
    portfolioDetailsQuery;
  const portfolioId = portfolioDetailsData?.id;

  const { data: experienceItemsData, isPending: experienceItemsIsPending } =
    useQuery({
      queryKey: ["portfolioExperienceItems", portfolioId],
      queryFn: () => {
        if (portfolioId)
          return portfolioService.getPortfolioExperienceItems(portfolioId);
        return null;
      },
      enabled: Boolean(portfolioId),
    });

  const experienceItemsNotReady =
    portfolioDetailsPending || experienceItemsIsPending;

  return { userDetails, experienceItemsData, experienceItemsNotReady };
};

export default useExperiencePage;
