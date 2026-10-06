import moment from "moment";
import {
  CommonLayout,
  ProjectDetailsGallery,
  ProjectDetailsHeader,
  Section,
} from "@components";
import { tagNameToTagPillProps } from "@utils";
import useProjectDetailsPage from "./useProjectDetailsPage";

const ALLOWED_FULLSCREEN_TYPES = ["pico-8-embed"];

const ProjectDetailsPage = () => {
  const { portfolioDetailsData, projectDetailsData, projectDetailsIsPending } =
    useProjectDetailsPage();

  return (
    <CommonLayout
      name={portfolioDetailsData?.name}
      appBarTitle="Projects"
      menuActiveItem="projects"
    >
      <ProjectDetailsHeader
        title={projectDetailsData?.title}
        description={
          projectDetailsData
            ? `${moment(projectDetailsData?.startDate.toDate()).format("MMM YYYY")} • ${projectDetailsData?.description}`
            : undefined
        }
        coverImg={projectDetailsData?.coverImg}
        links={projectDetailsData?.links}
        tags={projectDetailsData?.tags?.map((tag) =>
          tagNameToTagPillProps(tag),
        )}
        isLoading={projectDetailsIsPending}
      />
      {projectDetailsIsPending ? (
        <>
          <ProjectDetailsGallery isLoading />
          <Section />
        </>
      ) : (
        projectDetailsData?.projectDetails?.map((projectDetail, idx) => {
          switch (projectDetail.type) {
            case "gallery": {
              return (
                <ProjectDetailsGallery
                  key={idx}
                  projectTitle={projectDetailsData.title}
                  coverImg={projectDetailsData.coverImg}
                  items={projectDetail.items}
                />
              );
            }
            case "detail": {
              return (
                <Section
                  key={idx}
                  header={projectDetail.label}
                  children={projectDetail.content}
                />
              );
            }
            case "iframe": {
              return (
                <Section key={idx} header={projectDetail.label}>
                  <iframe
                    className={projectDetail.contentType}
                    src={projectDetail.src}
                    allowFullScreen={ALLOWED_FULLSCREEN_TYPES.includes(
                      projectDetail.contentType ?? "",
                    )}
                  ></iframe>
                </Section>
              );
            }
          }
        })
      )}
    </CommonLayout>
  );
};

export default ProjectDetailsPage;
