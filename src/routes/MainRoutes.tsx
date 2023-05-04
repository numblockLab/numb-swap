import ErrorPage from "../view/error";
import HomeView from "../view/home";
import { NotFoundView } from "../view/404";
import PoolsView from "../view/pool";

// project imports

const MainRoutes = [
  {
    path: "/",
    index: true,
    element: <HomeView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/pools",
    index: true,
    element: <PoolsView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/404",
    element: <NotFoundView />,
    errorElement: <ErrorPage />,
  },
];

export default MainRoutes;
