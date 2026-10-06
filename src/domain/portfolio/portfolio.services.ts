import type { PortfolioRepository } from "@infrastructure";
import type {
  LikeProjectInput,
  Project,
  Portfolio,
  PortfolioFeaturedItems,
  PortfolioExperienceItems,
  GetProjectDetailsByIdInput,
} from "./portfolio.types";

interface PortfolioService {
  getPortfolioDetails(): Promise<Portfolio | undefined>;
  getPortfolioFeaturedItems(
    portfolioId: string,
  ): Promise<PortfolioFeaturedItems>;
  getPortfolioExperienceItems(
    portfolioId: string,
  ): Promise<PortfolioExperienceItems>;
  getPortfolioProjects(portfolioId: string): Promise<Project[]>;
  likeProject(data: LikeProjectInput): Promise<boolean>;
  getProjectDetailsById(
    data: GetProjectDetailsByIdInput,
  ): Promise<Project | undefined>;
}

class DefaultPortfolioService implements PortfolioService {
  private PortfolioRepository: PortfolioRepository;

  constructor(PortfolioRepository: PortfolioRepository) {
    this.PortfolioRepository = PortfolioRepository;
  }

  async getPortfolioDetails(): Promise<Portfolio | undefined> {
    const portfolio = await this.PortfolioRepository.getPortfolioById("v3");

    if (portfolio) return portfolio;
  }

  async getPortfolioFeaturedItems(
    portfolioId: string,
  ): Promise<PortfolioFeaturedItems> {
    const projects = await this.PortfolioRepository.getPortfolioProjects({
      filters: {
        isFeatured: true,
        orderBy: "likes",
        orderByDirection: "desc",
      },
      portfolioId,
    });

    return {
      projects,
    };
  }

  async getPortfolioExperienceItems(
    portfolioId: string,
  ): Promise<PortfolioExperienceItems> {
    const experiences =
      await this.PortfolioRepository.getPortfolioExperiences(portfolioId);
    const remappedExperiences = experiences.map((experience) => {
      const sortedPositions = experience.positions.sort(
        (a, b) =>
          b.startDate.toDate().getTime() - a.startDate.toDate().getTime(),
      );
      return {
        ...experience,
        positions: sortedPositions,
      };
    });

    const skillSets =
      await this.PortfolioRepository.getPortfolioSkillSets(portfolioId);

    return {
      experiences: remappedExperiences,
      skillSets,
    };
  }

  getPortfolioProjects(portfolioId: string): Promise<Project[]> {
    return this.PortfolioRepository.getPortfolioProjects({
      filters: {
        orderBy: "startDate",
        orderByDirection: "desc",
      },
      portfolioId,
    });
  }

  likeProject(data: LikeProjectInput): Promise<boolean> {
    return this.PortfolioRepository.likeProject(data);
  }

  getProjectDetailsById(
    data: GetProjectDetailsByIdInput,
  ): Promise<Project | undefined> {
    return this.PortfolioRepository.getProjectDetailsById(data);
  }
}

export default DefaultPortfolioService;
export type { PortfolioService };
