import React, {useEffect, useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import OfferHelp from './components/OfferHelp'
import GetHelp from './components/GetHelp'
import Home from './components/Home';
import Admin from './components/Admin';
import DisplayDetails from './components/DisplayDetails'
import ErrorPage from './components/404';
import OfferDetails from './components/OfferDetails';
import UpdateDetails from './components/UpdateForm';
import UpdateOffer from './components/UpdateOffer';
import About from './components/About';

function App() {
  const [user, setUser] = useState(null);

   useEffect(() => {
        const config = {
            params: {
                _id: localStorage.getItem('_id')
            }
        }
        console.log(config.params._id)
        setUser(config.params._id);
    }, [])
  return (
    <>
      <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/offer-help" component={OfferHelp} />
                <Route path="/get-help" component={GetHelp} />
                <Route path="/admin" component={Admin} />
                <Route path="/req-details/:id" component={DisplayDetails} />
                <Route path="/offer-details/:id" component={OfferDetails} />
                <Route path="/about" component={About} />
                {(user) && (
                <>
                  <Route path="/offer-update/:id" component={UpdateOffer} />
                  <Route path="/update/:id" component={UpdateDetails} />
                </>
                )}
                <Route component={ErrorPage} />
                
      </Switch>
    </>    
  );
}

export default App;
