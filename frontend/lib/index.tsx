import React, { Suspense, lazy } from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ROUTES } from "./routes";
import { FullScreenLoading } from "./components/full-screen-loading";
import { Topbar } from "./components/topbar";
import { Footer } from "./components/footer";
import "./index.css";

// Lazy load every page for code-splitting
const LandingPage = lazy(() => import("./pages/landing"));
const PuppiesPage = lazy(() => import("./pages/blog"));
const PuppyDetailPage = lazy(() => import("./pages/publication"));
const AboutPage = lazy(() => import("./pages/about"));
const BreedsPage = lazy(() => import("./pages/breeds"));
const TestimonialsPage = lazy(() => import("./pages/testimonials"));
const ContactPage = lazy(() => import("./pages/contact"));
const LoginPage = lazy(() => import("./pages/login"));
const AdminDashboard = lazy(() => import("./pages/admin-dashboard"));
const LegalPage = lazy(() => import("./pages/legal"));

dayjs.extend(LocalizedFormat);

const isAdmin = () => {
  try {
    return localStorage.getItem("user_role") === "admin";
  } catch {
    return false;
  }
};

const AdminRoute = ({ children }: { children: React.ReactNode }) =>
  isAdmin() ? <>{children}</> : <Navigate to={ROUTES.LOGIN} replace />;

export function Root() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        <Topbar />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Suspense fallback={<FullScreenLoading />}>
              <Routes>
                <Route path={ROUTES.LANDING_PAGE} element={<LandingPage />} />
                <Route path={ROUTES.PUPPIES} element={<PuppiesPage />} />
                <Route path={ROUTES.PUBLICATION_PAGE} element={<PuppyDetailPage />} />
                <Route path={ROUTES.BREEDS} element={<BreedsPage />} />
                <Route path={ROUTES.TESTIMONIALS} element={<TestimonialsPage />} />
                <Route path={ROUTES.ABOUT} element={<AboutPage />} />
                <Route path={ROUTES.CONTACT} element={<ContactPage />} />
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route
                  path={ROUTES.ADMIN_DASHBOARD}
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route path="/legal/:type" element={<LegalPage />} />
                <Route path="*" element={<LandingPage />} />
              </Routes>
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
