import { DefaultMessageService, DefaultPortfolioService } from "@domain";
import {
  firebaseFirestore,
  FirestoreMessageRepository,
  FirestorePortfolioRepository,
} from "@infrastructure";
import { createContext } from "react";

const portfolioRepository = new FirestorePortfolioRepository(firebaseFirestore);
const portfolioService = new DefaultPortfolioService(portfolioRepository);
const messageRepository = new FirestoreMessageRepository(firebaseFirestore);
const messageService = new DefaultMessageService(messageRepository);

const services = {
  portfolioService,
  messageService,
};

const ServicesContext = createContext(services);

type Props = {
  children?: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

export default Provider;
export { ServicesContext };
