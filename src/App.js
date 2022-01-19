import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/login_design.css";
import "./css/main_design.css";
import "./css/product_design.css";
import "./css/profile_design.css";
import Navbar from "./components/navbar.component";
import ItemsLists from "./components/item-lists.component";
import EditItem from "./components/edit-item.component";
import CreateItem from "./components/create-item.component";
import CreateUser from "./components/create-user.component";
import CreatePrinter from "./components/create-printer.component";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <br/>
        <Routes>
          <Route path="/" exact element={ <ItemsLists/> } />
          {/* <Route path="/edit/:id" element={ <EditItem/> } />
          <Route path="/create" element={ <CreateItem/> } />
          <Route path="/user" element={ <CreateUser/> } />
          <Route path="/printer" element={ <CreatePrinter/> }/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
