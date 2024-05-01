import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "components/Layout/Layout";
import AudienceMenu from "components/Navigation/AudienceMenu";
import { NavMenuEnum } from "components/UIElements/NavMenu";
import CaptureToolsMenu from "components/Navigation/CaptureToolsMenu";
import PageWithMenu from "components/Layout/PageWithMenu";
import PostEngagementsList from "components/PostEngagements/PostEngagementsList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    },
  },
});

const App = () => {
  const { pathname } = useLocation();
  const placeholder = (
    <div className="p-2 truncate text-base rounded-md border border-slate-400">
      {pathname}
    </div>
  );

  return (
    <QueryClientProvider client={queryClient}>
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
              element={<PostEngagementsList />}
            />
            <Route path="*" element={placeholder} />
          </Route>
          <Route
            path="*"
            element={<div className="lg:col-span-9">{placeholder}</div>}
          />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
