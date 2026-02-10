import Layout from "../components/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";
import ReportPet from "../pages/ReportPet";
import LostPets from "../pages/LostPets";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Rutas siempre accesibles */}
        <Route index element={<Home />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="resetpassword" element={<ResetPassword />} />

        {/* Solo si el usuario NO está autenticado */}
        <Route element={<PublicRoute />}>
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* El login en realidad deberia ser para usuarios NO autenticados, pero entra en conflico con un useEffect dentro de Login.tsx*/}
        <Route path="login" element={<Login />} />

        {/* Solo si el usuario está autenticado */}
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="reportpet" element={<ReportPet />} />
          <Route path="lostpets" element={<LostPets />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
