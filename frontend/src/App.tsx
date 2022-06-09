import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import NavBar from "./components/NavBar";
import GymViewPage from "./components/GymDetails";


const App: FC = () => {
  return (
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
  );
};

export default App;
