import { TypingContextProvider } from "@/contexts/useTypingContext";
import Body from "./Body";
import Header from "./Header";

const index = () => {
  return (
    <TypingContextProvider>
      <div className="app">
        <Header />
        <Body />
      </div>
    </TypingContextProvider>
  );
};

export default index;
