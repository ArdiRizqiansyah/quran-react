import Home from "./views/pages/Home";
import Surah from "./views/pages/Surah";

const routes = [
    { path: '/', exact: true, name: 'Home', element: <Home />},
    { path: '/surah/:id', exact: true, name: 'Home', element: <Surah />},
];

export default routes;