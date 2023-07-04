import Header from "../../Molecules/Header/Header";

import useUserStore from "../../userStore";

const Layout = () => {
  const user = useUserStore((state) => state.loggedInUser);
  return (
    <>
      <Header user={user} />
    </>
  );
};

export default Layout;
