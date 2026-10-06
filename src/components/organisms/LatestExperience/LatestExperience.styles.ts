import { styled } from "@mui/material";

const ExperiencesContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  ".experience-row-container": {
    padding: "0 0 16px 0",
    width: "100%",
  },

  ".experience-row-container:not(:first-of-type)": {
    borderTop: "1px solid gray",
  },

  ".position-row-container": {
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },

  ".position-container": {
    width: "100%",
  },

  ".position-title": {
    fontWeight: "bold",
  },

  ".position-description": {
    whiteSpace: "pre-wrap",
    paddingTop: "10px",
  },

  ".latest-experience-see-more": {
    borderRadius: "100px",
    fontWeight: "bold",
  },

  ".latest-experience-see-more .MuiButton-endIcon": {
    marginTop: "-2px",
    marginRight: "-8px",
  },
}));

export { ExperiencesContainer };
