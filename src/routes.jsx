import Doa from "./views/pages/Doa";
import Home from "./views/pages/Home";
import Surah from "./views/pages/Surah";

const routes = [
    { path: '/', exact: true, name: 'Home', element: <Home />},
    { path: '/surah/:id', exact: true, name: 'Surah', element: <Surah />},
    { path: '/doa', exact: true, name: 'Doa', element: <Doa />},
];

export default routes;