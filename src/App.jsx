import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import { BrowserRouter } from "react-router-dom";
import appConfig from "./components/configs/app.config";
import mockServer from "./mock";
import AllRoutes from "./components/routes/AllRoutes";
import ScrollToTop from "./components/shared/ScrollToTop";

const environment = import.meta.env.VITE_NODE_ENV;

if (appConfig.enableMock) {
  mockServer({ environment });
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ScrollToTop>
            <AllRoutes />
          </ScrollToTop>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
