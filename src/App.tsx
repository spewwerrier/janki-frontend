import config from "../config";
import Login, { HasLoggedIn } from "./Login";
import RetriveKnobs from "./RetriveKnobs";

function App() {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="navbar-center">
                Janki
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-auto p-2 shadow">
                <li>connected to server: {config.SERVER_URL}</li>
              </ul>
            </div>
          </a>
        <a href="./newknob">New</a>
        <a href="./profile">Profile</a>
        </div>
      </div>
      { HasLoggedIn()?<RetriveKnobs/>: <Login/>}
    </>
  );
}

export default App;

