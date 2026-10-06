import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { CreateMessageInput } from "@domain";
import { useGetPortfolioDetails, useServices } from "@hooks";

const useContactPage = () => {
  const { messageService } = useServices();

  const [isShowEmail, setIsShowEmail] = useState(false);
  const [isShowEmailTooltip, setIsShowEmailTooltip] = useState(false);

  const { portfolioDetailsQuery } = useGetPortfolioDetails();
  const { data: portfolioDetailsData, isPending: portfolioDetailsIsPending } =
    portfolioDetailsQuery;
  const email = portfolioDetailsData?.email;

  const {
    mutate: createMessageMutate,
    isPending: createMessageIsPending,
    status: createMessageStatus,
  } = useMutation({
    mutationKey: ["createMessage"],
    mutationFn: (data: CreateMessageInput) =>
      messageService.createMessage(data),
  });

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

  return {
    isShowEmail,
    setIsShowEmail,
    isShowEmailTooltip,
    portfolioDetailsData,
    portfolioDetailsIsPending,
    email,
    createMessageIsPending,
    createMessageStatus,
    handleMessageSubmitValid,
    handleClickEmail,
    handleCloseEmailTooltip,
  };
};

export default useContactPage;
