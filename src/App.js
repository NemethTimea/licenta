import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

import Navbar from "./components/navbar.component";
import ItemsLists from "./components/item-lists.component";
import EditItem from "./components/edit-item.component";
import CreateItem from "./components/create-item.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <br/>
        <Routes>
          <Route path="/" exact element={ <ItemsLists/> } />
          <Route path="/edit/:id" element={ <EditItem/> } />
          <Route path="/create" element={ <CreateItem/> } />
          <Route path="/user" element={ <CreateUser/> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
