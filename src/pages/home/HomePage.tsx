import {
  HomeLayout,
  FeaturedProjects,
  Section,
  LatestExperience,
} from "@components";
import { tagNameToTagPillProps } from "@utils";
import useHomePage from "./useHomePage";

const HomePage = () => {
  const {
    likedProjects,
    userDetails,
    portfolioDetailsData,
    featuredItemsData,
    featuredItemsNotReady,
    handleLikeClick,
    handleSeeMoreExperienceClick,
    handleSeeMoreProjectsClick,
    handleProjectActionClick,
  } = useHomePage();

  return (
    <HomeLayout userDetails={userDetails} menuActiveItem="home">
      <Section header="About">{portfolioDetailsData?.description}</Section>
      <LatestExperience
        experience={featuredItemsData?.experience}
        onSeeMoreClick={handleSeeMoreExperienceClick}
      />
      <FeaturedProjects
        projects={
          featuredItemsNotReady
            ? Array.from({ length: 2 }).map((_e, idx) => ({
                id: idx.toString(),
                isLoading: true,
              }))
            : featuredItemsData?.projects.map((project) => {
                return {
                  ...project,
                  tags: project.tags?.map((tag) => tagNameToTagPillProps(tag)),
                  isLiked: likedProjects.includes(project.id),
                  onLikeClick: handleLikeClick,
                  onActionClick: handleProjectActionClick(project.id),
                };
              })
        }
        onSeeMoreClick={handleSeeMoreProjectsClick}
      />
    </HomeLayout>
  );
};

export default HomePage;
