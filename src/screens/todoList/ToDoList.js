import Header from "./components/header";
import { useState } from "react";
import Tasklist from "./components/tasklist /Tasklist";

function ToDoList() {
  const [isEnable, setIsEnable] = useState(true);

  const enableSideBar = () => {
    setIsEnable(!isEnable);
  };

  return (
    <>
      {!isEnable && <Header enableSideBar={enableSideBar} />}
      <Tasklist isEnable={isEnable} enableSideBar={enableSideBar} />
    </>
  );
}
export default ToDoList;
