import MainHeader from "./MainHeader";

const RootLayout = (props) => {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
    </>
  );
};

export default RootLayout;
