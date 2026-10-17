import { createContext } from "react";
import {
  DefaultMessageService,
  DefaultPortfolioService,
  FirestoreMessageRepository,
  FirestorePortfolioRepository,
} from "portfolio-core";
import { firebaseFirestore } from "@configs";

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
