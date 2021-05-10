import './App.css';
import AuthContextProvider from './contexts/AuthContext'
import PostContextProvider from './contexts/PostContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import ProtectedRoute from './components/routings/ProtectedRoute'
import Dashboard from './views/Dashboard';

function App() {
  return (
    <AuthContextProvider>
    <PostContextProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' render={props => <Auth {...props} authRoute='login' />} />
          <Route exact path='/register' render={props => <Auth {...props} authRoute='register' />} />
          <ProtectedRoute exact path='/dashboard' component={Dashboard}/>
        </Switch>
      </Router>
    </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
