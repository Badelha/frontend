import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/components/Layout";

import Dashboard from "./pages/Dashboard";
import Ads from "./pages/Ads";
import Messages from "./pages/Messages";
import MessagesEmpty from "./pages/MessagesEmpty";
import Notifications from "./pages/Notifications";
import Orders from "./pages/Orders";
import PurchaseOrders from "./pages/PurchaseOrders";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ads" element={<Ads />} />
          <Route path="messages" element={<Messages />} />
          <Route path="messages-empty" element={<MessagesEmpty />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="orders" element={<Orders />} />
          <Route path="purchase-orders" element={<PurchaseOrders />} />
          <Route path="users" element={<Users />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;



