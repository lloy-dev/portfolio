import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useServices } from "@hooks";
import type { Portfolio, Project } from "portfolio-core";

const useProjectDetailsPage = () => {
  const { projectId } = useParams();
  const { portfolioService } = useServices();

  const { data: portfolioDetailsData } = useQuery({
    queryKey: ["portfolioDetails"],
    queryFn: (): Promise<Portfolio | undefined> =>
      portfolioService.getPortfolioDetails(),
  });

  const portfolioId = portfolioDetailsData?.id;

  const { data: projectDetailsData, isPending: projectDetailsIsPending } =
    useQuery({
      queryKey: ["projectDetails", portfolioId, projectId],
      queryFn: (): Promise<Project | undefined> | undefined => {
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
