import Navbar from '../Navbar/Navbar'

const Layout = ({ children, username }) => {
  return (
    <>
        <Navbar username={username}/>
        <main>
            {children}
        </main>
    </>
  );
};

export default Layout;


