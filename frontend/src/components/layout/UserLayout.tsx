import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import Header from "../common/Header";

function UserLayout() {
  return (
    <>
      {/*Header*/}
      <Header />
      {/*Main content*/}
      <main>
        <Outlet />
      </main>
      {/*Footer*/}
      <Footer />
    </>
  );
}

export default UserLayout;
