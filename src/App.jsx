import { BrowserRouter, Route, Routes } from "react-router-dom"
import routes from "./routes"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          return (
            route.element && (
              <Route 
                key={index}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={route.element}
              />
            )
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default App
