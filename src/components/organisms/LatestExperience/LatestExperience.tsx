import moment from "moment";
import type { Timestamp } from "firebase/firestore";
import { Skeleton, Typography } from "@mui/material";
import { Outbound as OutboundIcon } from "@mui/icons-material";
import { Button, Section } from "@components";
import { ExperiencesContainer } from "./LatestExperience.styles";

type Props = {
  onSeeMoreClick: () => void;
  experience?: {
    id: string;
    companyName?: string;
    positions: {
      title?: string;
      location?: string;
      description?: string;
      startDate?: Timestamp;
      endDate?: Timestamp;
    }[];
  };
};

const Component = ({ onSeeMoreClick, experience }: Props) => {
  const pos =
    experience && experience.positions.length > 0
      ? experience?.positions[0]
      : undefined;

  const endDate = pos?.endDate?.toDate() ?? new Date();
  const totalMonths = moment(endDate).diff(pos?.startDate?.toDate(), "months");
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const yearsText = years ? `${years} yrs` : "";
  const monthsText = months ? `${months} mos` : "";

  return (
    <Section header="Experience">
      <ExperiencesContainer>
        <div className="experience-row-container">
          <div className="company-container">
            <Typography variant="h6">
              {experience?.companyName ? experience.companyName : <Skeleton />}
            </Typography>
          </div>
          <div className="position-row-container">
            <div className="position-line-container"></div>
            <div className="position-container">
              <Typography variant="body1" className="position-title">
                {pos?.title ? pos.title : <Skeleton />}
              </Typography>
              <Typography variant="caption">
                {pos?.startDate ? (
                  `${moment(pos.startDate?.toDate()).format("MMM YYYY")} - ${
                    pos.endDate?.toDate()
                      ? moment(pos.endDate.toDate()).format("MMM YYYY")
                      : "Present"
                  } • ${yearsText} ${monthsText}`
                ) : (
                  <Skeleton />
                )}
              </Typography>
              <br />
              <Typography variant="caption">
                {pos?.location ? pos.location : <Skeleton />}
              </Typography>
              <Typography variant="body1" className="position-description">
                {pos?.description ? (
                  pos.description.split(/\n\s*\n/)[0]
                ) : (
                  <Skeleton />
                )}
              </Typography>
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          className="latest-experience-see-more"
          onClick={onSeeMoreClick}
          endIcon={<OutboundIcon />}
        >
          See More
        </Button>
      </ExperiencesContainer>
    </Section>
  );
};

export default Component;
