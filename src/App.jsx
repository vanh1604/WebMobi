import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Categories from "./components/Categories";

import { ToastContainer } from "react-toastify";

import { PersistGate } from "redux-persist/integration/react";
import { persiststor } from "./redux-setup/store";
import routers from "./routers/routers";

function App() {
  return (
    <>
    
      <PersistGate persistor={persiststor}>
        <ToastContainer />
        <Navbar />
        <Categories />
        <Routes>
          {routers.map((item) => {
            return (
              <Route
                key={item.path}
                path={item.path}
                element={<item.element />}
              ></Route>
            );
          })}
        </Routes>
      </PersistGate>

    </>
  );
}

export default App;
