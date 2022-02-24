import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/login_design.css";
import "./css/main_design.css";
import "./css/product_design.css";
import "./css/profile_design.css";
import "./css/create_post_design.css";
import "./css/explore-design.css";
import ItemsLists from "./components/item-lists.component";
import ModelDetails from "./components/model-details.component";
import Login from "./components/login-user.component";
import CreatePost from "./components/create-post.component";
import UserPage from "./components/user-page.component";
import Explore from "./components/explore-page.component";
import Register from "./components/register-user.component";

import EditItem from "./components/edit-item.component";
import CreateItem from "./components/create-item.component";
import CreateUser from "./components/create-user.component";
import CreatePrinter from "./components/create-printer.component";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" exact element={ <ItemsLists/> } />
          <Route path="/details" element={ <ModelDetails/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="/createpost" element={ <CreatePost/> } />
          <Route path="/userpage" element={ <UserPage/> } />
          <Route path="/explore" element={ <Explore/> } />
          <Route path="/register" element={ <Register/> } />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
