/* ===== AUTH + INDEX ===== */
import React, { lazy, Suspense } from "react";

/*COMPONENTES HOME*/
const Dashboard = lazy(() => import("../../screens/home/cursos/Dashboard.jsx"));
const Curso = lazy(() =>
  import("../../screens/home/cursos/CursoDetalles/Curso.jsx")
);
const Leccion = lazy(() =>
  import("../../screens/home/cursos/Leccion/Leccion.jsx")
);
const Challenge = lazy(() =>
  import("../../screens/home/challenge/Challenge.jsx")
);
const SocialHome = lazy(() =>
  import("../../screens/home/social/Home/Home.jsx")
);
const Profile = lazy(() =>
  import("../../screens/home/social/Profile/Profile.jsx")
);
const Settings = lazy(() =>
  import("../../screens/home/social/Settings/Settings.jsx")
);
const PublicationPV = lazy(() =>
  import("../../screens/home/social/Profile/Publication/PublicationPV.jsx")
);
const CodeSanbox = lazy(() =>
  import("../../screens/home/codesandbox/CodeSandbox/CodeSandbox.jsx")
);
const Sandbox = lazy(() =>
  import("../../screens/home/codesandbox/Sandbox/Sandbox.jsx")
);

/*COMPONENTES*/
const PageNotFound = lazy(() =>
  import("../../screens/components/PageNotFound/PageNotFound")
);

const routes = [
  { path: "/dashboard", component: Dashboard, exact: true },
  { path: "/dashboard/curso/:id", component: Curso, exact: true },
  {
    path: "/dashboard/curso/:id/tema/:tema/leccion/:leccion",
    component: Leccion,
    exact: true,
  },
  { path: "/challenge", component: Challenge, exact: true },
  { path: "/comunidad/feed", component: SocialHome, exact: true },
  { path: "/profile/:username", component: Profile, exact: true },
  { path: "/settings/account", component: Settings, exact: true },
  {
    path: "/comunidad/publication/:publication",
    component: PublicationPV,
    exact: true,
  },
  { path: "/codesandbox", component: CodeSanbox, exact: true },
  {
    path: "/codesandbox/sandbox/:language/:idSandbox",
    component: Sandbox,
    exact: true,
  },

  { component: PageNotFound },
];

export default routes;
