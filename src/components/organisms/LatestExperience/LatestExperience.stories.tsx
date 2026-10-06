import type { Meta, StoryObj } from "@storybook/react-vite";
import { Timestamp } from "firebase/firestore";
import LatestExperience from "./LatestExperience";
import { fn } from "storybook/test";

const meta = {
  title: "Components/Organisms/LatestExperience",
  component: LatestExperience,
  globals: {
    backgrounds: { value: "backgroundLight" },
  },
} satisfies Meta<typeof LatestExperience>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {},
  args: {
    experience: {
      id: "1",
      companyName: "Company A",
      positions: [
        {
          title: "Software Engineer",
          startDate: Timestamp.fromDate(new Date("1/1/2020")),
          location: "Philippines",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          
          Next Paragraph.`,
        },
      ],
    },
    onSeeMoreClick: fn(),
  },
};

export const Loading: Story = {
  args: {
    experience: { id: "1", positions: [{}] },
    onSeeMoreClick: fn(),
  },
};
