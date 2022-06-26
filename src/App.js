import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";
import Home from "./Pages/Home/Home";
import Games from "./Pages/Games/Games";
import Purchase from "./Pages/Purchase/Purchase";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import AuthProvider from "./contexts/AuthProvider";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Cart from "./Pages/Cart/Cart";
import GamesDetails from "./Pages/GamesDetails/GamesDetails";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin/MakeAdmin";
import AddGames from "./Pages/Dashboard/AddGames/AddGames";
import AdminRoute from "./Components/AdminRoute/AdminRoute";
import EditGames from "./Pages/Dashboard/EditGames/EditGames";
import ManageOrders from "./Pages/Dashboard/ManageOrders/ManageOrders";
import Pay from "./Pages/Dashboard/Pay/Pay";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/games' element={
              <PrivateRoute>
                <Games showButton={true} isNavbar={true} />
              </PrivateRoute>}
            />
            <Route path='/cart' element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>}
            />
            <Route path='/games/:id' element={
              <PrivateRoute>
                <GamesDetails />
              </PrivateRoute>}
            />
            <Route path='/purchase/:_id' element={
              <PrivateRoute>
                <Purchase />
              </PrivateRoute>}
            />
            <Route path='/dashboard' element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>}
            >
              <Route path='payment' element={
                <PrivateRoute>
                  <Pay />
                </PrivateRoute>}
              />
              <Route path='myorders' element={<DashboardHome />} />
              <Route path='makeadmin' element={
                <AdminRoute>
                  <MakeAdmin />
                </AdminRoute>}
              ></Route>
              <Route path='addgames' element={
                <AdminRoute>
                  <AddGames />
                </AdminRoute>}
              ></Route>
              <Route path='editgames' element={
                <AdminRoute>
                  <EditGames />
                </AdminRoute>}
              ></Route>
              <Route path='manageorders' element={
                <AdminRoute>
                  <ManageOrders />
                </AdminRoute>}
              ></Route>
            </Route>
            <Route path='/purchase/:id' element={<Purchase />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />


            {/* <Route path='*' element={<NotFound />} /> */}

          </Routes>
        </Router>
      </AuthProvider>
    </div >
  );
}

export default App;
