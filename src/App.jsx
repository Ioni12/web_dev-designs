import Navbar from "./components/navbars/Navbar";
import NavbarWithProfile from "./components/navbars/NavbarWithProfile";
import LoadingDemo from "./components/loading/LoadingDemo";
import HeroExample from "./components/hero_section/HeroExample";
import Input from "./components/inputs/Input";
import FormDemo from "./components/forms/Form";
import AuthComponent from "./components/auth_forms/AuthComponent";

function App() {
  return (
    <>
      <Navbar />
      <AuthComponent />
    </>
  );
}

export default App;
