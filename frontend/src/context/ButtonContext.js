import { createContext, useState } from "react";

export const ButtonContext = createContext();

export const ButtonProvider = (props) => {
  const [currentNum, setCurrentNum] = useState(0);
  const [sessionUserId, setSessionUserId] = useState('')

  return (
    <ButtonContext.Provider value={{ currentNum, setCurrentNum, sessionUserId, setSessionUserId }}>
      {props.children}
    </ButtonContext.Provider>
  );
};

export default ButtonProvider;
