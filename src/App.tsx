import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "components/Layout/Layout";
import AudienceMenu from "components/Navigation/AudienceMenu";
import { NavMenuEnum } from "components/UIElements/NavMenu";
import CaptureToolsMenu from "components/Navigation/CaptureToolsMenu";
import PageWithMenu from "components/Layout/PageWithMenu";

const App = () => {
  const { pathname } = useLocation();
  const placeholder = (
    <div className="p-2 truncate text-base rounded-md border border-slate-400">
      {pathname}
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={<Navigate replace to="/capture-tools/post-engagement" />}
        />
        <Route
          path="/audience"
          element={
            <PageWithMenu
              menu={
                <AudienceMenu text="Audience" variant={NavMenuEnum.NavPage} />
              }
            />
          }
        >
          <Route path="*" element={placeholder} />
        </Route>
        <Route
          path="/capture-tools"
          element={
            <PageWithMenu
              menu={
                <CaptureToolsMenu
                  text="Capture Tools"
                  variant={NavMenuEnum.NavPage}
                />
              }
            />
          }
        >
          <Route
            path="/capture-tools/post-engagement"
            element={
              <>
                <div className="bg-red-500 h-96" />
                <div className="bg-blue-500 h-96" />
                <div className="bg-green-500 h-96" />
              </>
            }
          />
          <Route path="*" element={placeholder} />
        </Route>
        <Route
          path="*"
          element={<div className="lg:col-span-9">{placeholder}</div>}
        />
      </Route>
    </Routes>
  );
};

export default App;
