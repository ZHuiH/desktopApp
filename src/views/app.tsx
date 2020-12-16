import React from 'react';
import { BrowserRouter as BrowserRouter,Switch,Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './assets/iconfont.css';
import './assets/app.less';
import Home from "./pages/home"
import Docker from "./pages/docker/index"
import DockerBuild from "./pages/docker/container/build"
import 'antd/dist/antd.css';
// import BrowserBtn from "./pages/browserBtn"

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

function App() {
  return (
    <div >
      {/* <BrowserBtn/> */}
      <BrowserRouter>
      <div id="app">
        <Switch >
          <Route path="/docker" component={Docker} exact={true}/>
          <Route path="/docker/container/bulid" component={DockerBuild} exact={true}/>
          <Route path="/" component={Home}/>
        </Switch>
      </div>
      
      </BrowserRouter>
    </div>
  );
}