import { BrowserRouter, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <main>
          <Route exact path="/" render={ props => <ItemsLists {...props} /> } />
          <Route path="/userpage" render={ props => <UserPage {...props} /> } />
          <Route path="/login/:token" render={ props => <Login {...props} /> } />
          <Route path="/register" component={Register}/>
          <Route path="/createpost" render={ props => <CreatePost {...props} /> } />
          <Route path="/details" render={ props => <ModelDetails {...props} /> } />
          <Route path="/explore" render={ props => <Explore {...props} /> } />
      </main>
    </BrowserRouter>
  );
}

export default App;