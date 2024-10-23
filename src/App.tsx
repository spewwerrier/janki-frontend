import Login from "./Login";
import Profile from "./Profile";
import RetriveKnobs from "./RetriveKnobs";

const SERVER_URL: string = "http://localhost:8080"
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
                <li>server url {SERVER_URL}</li>
              </ul>
            </div>
          </a>
        <a href="./new">New</a>
        <a href="./profile">Profile</a>
        </div>
      </div>
      <Login />
      <RetriveKnobs/>
    </>
  );
}

export default App;

