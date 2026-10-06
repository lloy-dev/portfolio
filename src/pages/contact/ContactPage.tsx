import { useState } from "react";
import { Card, CardContent, Typography, Link, Tooltip } from "@mui/material";
import { Email as EmailIcon } from "@mui/icons-material";
import { CommonLayout, ContactForm } from "@components";
import type { CreateMessageInput } from "@domain";
import {
  ContentContainer,
  ContactDetailsContainer,
} from "./ContactPage.styles";
import useGetContact from "./api/useGetContact";
import useCreateMessage from "./api/useCreateMessage";

const ContactPage = () => {
  const [isShowEmail, setIsShowEmail] = useState(false);
  const [isShowEmailTooltip, setIsShowEmailTooltip] = useState(false);

  const { portfolioDetailsQuery } = useGetContact();
  const { data: portfolioDetailsData, isPending: portfolioDetailsIsPending } =
    portfolioDetailsQuery;
  const {
    mutate: createMessageMutate,
    isPending: isCreateMessagePending,
    status: createMessageStatus,
  } = useCreateMessage();

  const email = portfolioDetailsData?.email;

  const handleMessageSubmitValid = (data: CreateMessageInput) => {
    const { name, email, message } = data;
    createMessageMutate({ name, email, message });
  };

  const handleClickEmail = () => {
    if (email) {
      navigator.clipboard.writeText(email);
      setIsShowEmailTooltip(true);
    }
  };

  const handleCloseEmailTooltip = () => {
    setTimeout(() => {
      setIsShowEmailTooltip(false);
    }, 200);
  };

  return (
    <CommonLayout
      name={portfolioDetailsData?.name}
      appBarTitle="Contact"
      pageLoaderProgress={portfolioDetailsIsPending ? 0 : 100}
    >
      <ContentContainer>
        <Card variant="outlined">
          <CardContent>
            <ContactForm
              onSubmitValid={handleMessageSubmitValid}
              isSendLoading={isCreateMessagePending}
              sendStatus={createMessageStatus}
            />
            <ContactDetailsContainer>
              <Typography variant="body1" className="contact-details-message">
                Wanna work together?
                <br />
                Drop me a message or just say hey.
                <br />
                I'd love to hear from you.
              </Typography>
              {!!portfolioDetailsData?.email && (
                <Typography className="contact-details-item">
                  <EmailIcon />
                  {isShowEmail ? (
                    <Tooltip
                      className="link-clickable"
                      title={isShowEmailTooltip ? "Copied!" : "Click to copy"}
                      onClose={handleCloseEmailTooltip}
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -8],
                              },
                            },
                          ],
                        },
                      }}
                      leaveDelay={isShowEmailTooltip ? 500 : undefined}
                      arrow
                    >
                      <Link onClick={handleClickEmail}>{email}</Link>
                    </Tooltip>
                  ) : (
                    <Link
                      className="link-clickable"
                      onClick={() => setIsShowEmail(true)}
                    >
                      [click to show]
                    </Link>
                  )}
                </Typography>
              )}
            </ContactDetailsContainer>
          </CardContent>
        </Card>
      </ContentContainer>
    </CommonLayout>
  );
};

export default ContactPage;
