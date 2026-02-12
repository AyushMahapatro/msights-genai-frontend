import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "./app/store";

import AppRoutes from "./routes/AppRoutes";

/* =========================
   Theme Sync Wrapper
========================= */

const AppContent = () => {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return <AppRoutes />;
};

/* =========================
   Root App
========================= */

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
