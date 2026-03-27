import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "./datastore/store"


function App() {
  const { user } = useAuthStore();
  return (
    <>

      {!user && <Navigate to="/auth/login" />}
      <Outlet />
    </>
  );
}

export default App
