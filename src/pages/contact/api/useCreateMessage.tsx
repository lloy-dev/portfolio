import { useMutation } from "@tanstack/react-query";
import { useServices } from "@hooks";
import type { CreateMessageInput } from "@domain";

const useCreateMessage = () => {
  const { messageService } = useServices();

  const mutation = useMutation({
    mutationKey: ["createMessage"],
    mutationFn: (data: CreateMessageInput) =>
      messageService.createMessage(data),
  });

  return mutation;
};

export default useCreateMessage;
