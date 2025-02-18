import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { Provider } from "react-redux";
import store from "./redux-setup/store.jsx";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </BrowserRouter>
  </Provider>
);
