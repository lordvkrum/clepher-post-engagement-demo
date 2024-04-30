import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "components/Layout/Layout";

const App = () => {
  const { pathname } = useLocation();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/capture-tools/post-engagement"
          element={<div>Post Engagement</div>}
        />
        <Route
          path="*"
          element={
            <div className="p-2 truncate text-base rounded-md border border-slate-400">
              {pathname}
            </div>
          }
        />
        <Route
          path="/"
          element={<Navigate replace to="/capture-tools/post-engagement" />}
        />
      </Route>
    </Routes>
  );
};

export default App;
