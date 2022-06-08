import { FC } from "react";
import FrontPage from "./components/FrontPage";
import NavBar from "./components/NavBar";


const App: FC = () => {
  return (
    <>
      <NavBar />
      <FrontPage />
    </>
  );
};

export default App;
