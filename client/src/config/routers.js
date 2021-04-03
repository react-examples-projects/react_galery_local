import App from "../Pages/Home/App";
import ImageItem from "../Pages/ImageItem/ImageItem";
import NotFound from "../Pages/NotFound/NotFound";
const routers = [
  {
    path: "/",
    component: App,
    exact: true,
  },
  {
    path: "/image/:id",
    component: ImageItem,
    exact: true,
  },
  {
    component: NotFound,
  },
];

export default routers;
