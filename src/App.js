import Login from "./pages/Login"
import Main from "./pages/Main"
import useCurrentUser from "./hooks/useCurrentUser";

function App() {

  const {currentUser, handleCurrentUser} = useCurrentUser()

  return (
    <>
      {currentUser ? <Main currentUser={currentUser} handleCurrentUser={handleCurrentUser}/> : <Login handleCurrentUser={handleCurrentUser}/>}
    </>
  );
}

export default App;
