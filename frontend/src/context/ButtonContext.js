import { createContext, useState } from "react";

export const ButtonContext = createContext();

export const ButtonProvider = (props) => {
  const [currentNum, setCurrentNum] = useState(0);

  return (
    <ButtonContext.Provider value={{ currentNum, setCurrentNum }}>
      {props.children}
    </ButtonContext.Provider>
  );
};

export default ButtonProvider;
