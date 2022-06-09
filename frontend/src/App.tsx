import { FC } from "react";
<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import NavBar from "./components/NavBar";
import GymViewPage from "./components/GymDetails";
=======
import FrontPage from "./components/FrontPage";
import NavBar from "./components/NavBar";
>>>>>>> 5d022df (feat: filtering - frontend)


const App: FC = () => {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <NavBar />
            <FrontPage />
          </>
        } />
        <Route path="/gym/add" element={
          <>TODO</>
        } />
        <Route path="/gym/:id" element={
          <GymViewPage />
        } />
        <Route path="/gym/:id/reviews" element={
          <>TODO</>
        } />
        <Route path="/course/:id" element={
          <>TODO</>
        } />
        <Route path="/user" element={
          <>TODO</>
        } />
        <Route path="/user/signup" element={
          <>TODO</>
        } />
        <Route path="/user/login" element={
          <>TODO</>
        } />
        <Route path="/*" element={
          <>
            <NavBar />
            <br />
            <br />
            <br />
            404 lol
          </>
        } />
    </Routes>
    </BrowserRouter>
=======
    <>
      <NavBar />
      <FrontPage />
    </>
>>>>>>> 5d022df (feat: filtering - frontend)
  );
};

export default App;
