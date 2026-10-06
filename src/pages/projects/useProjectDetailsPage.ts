import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useServices } from "@hooks";

const useProjectDetailsPage = () => {
  const { projectId } = useParams();
  const { portfolioService } = useServices();

  const { data: portfolioDetailsData } = useQuery({
    queryKey: ["portfolioDetails"],
    queryFn: () => portfolioService.getPortfolioDetails(),
  });

  const portfolioId = portfolioDetailsData?.id;

  const { data: projectDetailsData, isPending: projectDetailsIsPending } =
    useQuery({
      queryKey: ["projectDetails", portfolioId, projectId],
      queryFn: () => {
        if (portfolioId && projectId)
          return portfolioService.getProjectDetailsById({
            portfolioId,
            projectId,
          });
      },
      enabled: Boolean(portfolioId && projectId),
    });

  return { portfolioDetailsData, projectDetailsData, projectDetailsIsPending };
};

export default useProjectDetailsPage;
