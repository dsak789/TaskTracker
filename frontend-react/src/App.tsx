import AllRoutes from "./AllRoutes";
import { AuthProvider } from "./utils/contextProviders/AuthProvider";
import QueryProvider from "./utils/contextProviders/QueryProvider";

const App = () => {
  return (
    <QueryProvider>
      <AuthProvider>
        <AllRoutes />
      </AuthProvider>
    </QueryProvider>
  );
};

export default App;
