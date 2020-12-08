import React from 'react';
import { BrowserRouter as BrowserRouter,Switch,Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './iconfont.css';
import './app.less';
import Home from "./pages/home"
import Docker from "./pages/docker"

ReactDOM.render(
    <App />
,
  document.getElementById('root')
);

function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route path="/docker" component={Docker} exact={true} />
        <Route path="/" component={Home} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}