import { Outlet } from "react-router-dom";

import { Header } from "../../components/Navbar";

export function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
