import React from 'react';
import { BrowserRouter as BrowserRouter,Switch,Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './iconfont.css';
import './app.less';
import Home from "./pages/home"
import Docker from "./pages/docker/index"
import BrowserBtn from "./pages/browserBtn"

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

function App() {
  return (
    <div >
      <BrowserBtn/>
      <BrowserRouter>
      <div id="app">
        <Switch >
          <Route path="/docker" component={Docker} exact={true} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
      
      </BrowserRouter>
    </div>
  );
}