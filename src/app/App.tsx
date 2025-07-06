import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/app/Layout";
import { AppHome, AppNoMatch, Home, NoMatch, View } from "@/pages";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/app" element={<Layout />}>
            <Route index element={<AppHome />} />
            <Route path="view" element={<View />} />
            <Route path="*" element={<AppNoMatch />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
