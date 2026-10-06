import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Send as SendIcon, Check as CheckIcon } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@components";
import type { CreateMessageInput } from "@domain";
import { Container } from "./ContactForm.styles";
import { contactFormSchema } from "./ContactForm.validations";
import { STRG_HAS_SUBMITTED_MESSAGE } from "@constants";

type Props = {
  onSubmitValid: (data: CreateMessageInput) => void;
  sendStatus: "error" | "success" | "idle" | "pending";
  isSendLoading?: boolean;
};

const Component = ({
  onSubmitValid,
  sendStatus,
  isSendLoading = false,
}: Props) => {
  const [successButton, setSuccessButton] = useState(false);
  const [hasSubmittedMessage, setHasSubmittedMessage] = useState<boolean>(
    () => {
      const cachedHasSubmittedMessage = localStorage.getItem(
        STRG_HAS_SUBMITTED_MESSAGE,
      );
      if (cachedHasSubmittedMessage) {
        const parsed: boolean = JSON.parse(cachedHasSubmittedMessage);
        return parsed;
      }
      return false;
    },
  );

  const defaultValues = {
    name: "",
    email: "",
    message: "",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    resolver: yupResolver(contactFormSchema),
    criteriaMode: "all",
    mode: "onTouched",
  });

  useEffect(() => {
    if (sendStatus === "success") {
      setSuccessButton(true);
      setHasSubmittedMessage(true);
      localStorage.setItem(STRG_HAS_SUBMITTED_MESSAGE, JSON.stringify(true));

      setTimeout(() => {
        setSuccessButton(false);
      }, 3000);

      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendStatus]);

  return (
    <form onSubmit={handleSubmit(onSubmitValid)}>
      <Container>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={isSendLoading || hasSubmittedMessage}
              required
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email (optional)"
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isSendLoading || hasSubmittedMessage}
            />
          )}
        />
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Message"
              error={!!errors.message}
              helperText={
                hasSubmittedMessage
                  ? "You can only submit a message once. Thanks!"
                  : errors.message?.message
              }
              rows={3}
              disabled={isSendLoading || hasSubmittedMessage}
              multiline
              required
            />
          )}
        />
        <Button
          className={`contact-form-send-button ${
            successButton ? "button-success" : ""
          }`}
          variant="contained"
          type="submit"
          disabled={!isValid || successButton || hasSubmittedMessage}
          loading={isSendLoading}
          endIcon={successButton ? <CheckIcon /> : <SendIcon />}
        >
          {successButton ? "Message Sent" : "Submit Message"}
        </Button>
      </Container>
    </form>
  );
};

export default Component;
