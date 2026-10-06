import { CommonLayout, ProjectCard } from "@components";
import { tagNameToTagPillProps } from "@utils";
import useProjectsPage from "./useProjectsPage";
import { ProjectsContainer } from "./ProjectsPage.styles";

const ProjectsPage = () => {
  const {
    likedProjects,
    portfolioDetailsData,
    projetsData,
    projectsNotReady,
    handleLikeClick,
    handleProjectActionClick,
  } = useProjectsPage();

  return (
    <CommonLayout
      name={portfolioDetailsData?.name}
      appBarTitle="Projects"
      menuActiveItem="projects"
    >
      <ProjectsContainer>
        {projectsNotReady
          ? Array.from({ length: 3 }).map((_e, idx) => (
              <ProjectCard key={idx} id={idx.toString()} isLoading />
            ))
          : projetsData?.map((project, index) => {
              return (
                <ProjectCard
                  key={index}
                  {...project}
                  tags={project.tags?.map((tag) => tagNameToTagPillProps(tag))}
                  onLikeClick={handleLikeClick}
                  isLiked={likedProjects.includes(project.id)}
                  actionText="Read More"
                  onActionClick={handleProjectActionClick(project.id)}
                />
              );
            })}
      </ProjectsContainer>
    </CommonLayout>
  );
};

export default ProjectsPage;
