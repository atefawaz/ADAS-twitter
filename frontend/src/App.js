import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    // <div className="App">
    //  <Login/>
    // </div>

    // wraps the entire application within BrowserRoute, enables client side routing
    <BrowserRouter>           

    {/* // a container for route definitions */}
    <Routes>

      {/* // each Route component specifies the react element to be rendered when the route matches */}
      <Route path="/" element={<Login/>}></Route>    
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/home" element={<Home/>}></Route>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
