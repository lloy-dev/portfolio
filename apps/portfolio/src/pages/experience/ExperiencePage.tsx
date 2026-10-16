import { HomeLayout, Experience, SkillSet } from "@components";
import { skillNameToSkillCardProps } from "@utils";
import useExperiencePage from "./useExperiencePage";

const ExperiencePage = () => {
  const { userDetails, experienceItemsData, experienceItemsNotReady } =
    useExperiencePage();

  return (
    <HomeLayout
      userDetails={userDetails}
      appBarTitle="Experience"
      menuActiveItem="experience"
    >
      <Experience
        experiences={
          experienceItemsNotReady
            ? Array.from({ length: 1 }).map((_e, idx) => ({
                id: idx.toString(),
                positions: [{}],
              }))
            : experienceItemsData?.experiences
        }
      />
      {experienceItemsData?.skillSets?.map((skillSetItem, index) => (
        <SkillSet
          key={index}
          title={skillSetItem.title}
          skillCards={skillSetItem.skills.map((skill) =>
            skillNameToSkillCardProps(skill),
          )}
        />
      ))}
    </HomeLayout>
  );
};

export default ExperiencePage;
