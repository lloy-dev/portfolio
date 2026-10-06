import { Skeleton, Typography, Link } from "@mui/material";
import Markdown from "react-markdown";
import { Container } from "./Section.styles";

type Props = {
  header?: string;
  children?: React.ReactNode;
};

const Component = ({ header, children }: Props) => {
  const isLoading = !children;
  const isMarkdown = typeof children === "string";

  const renderedContent = {
    loading: <Skeleton />,
    default: children,
    markdown: (
      <Markdown
        components={{
          p: Typography,
          a: (props) => (
            <Link {...props} target="_blank" rel="noopener noreferrer" />
          ),
        }}
      >
        {children as string}
      </Markdown>
    ),
  };
  type RenderedContentKeys = keyof typeof renderedContent;

  const getRenderedContentKey = (): RenderedContentKeys => {
    if (isLoading) return "loading";
    else if (isMarkdown) return "markdown";
    else return "default";
  };

  return (
    <Container className={`${isMarkdown ? "section-markdown-container" : ""}`}>
      <Typography
        variant="h3"
        className="section-header-container"
        sx={{ fontSize: 36 }}
      >
        {header ? header : <Skeleton />}
      </Typography>
      {renderedContent[getRenderedContentKey()]}
    </Container>
  );
};

export default Component;
