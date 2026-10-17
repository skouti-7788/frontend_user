import './App.css';
import Home from './pages/home';
import Loguser from './pages/log';
import Detailes from './pages/details';
import  Panier from './components/home/panier'
import  Footer from './components/home/footer'
import Rate from './pages/rate'
import Share from './pages/share' 
import {useSelector } from "react-redux";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Opinion from './pages/opinion';
 
import Profile from './pages/profile';
 import Favorites from './pages/favorites';
import History from './pages/History';
import Notifications from './pages/notifications';
import Account from './pages/Account';
function App() {
  const show = useSelector((state)=> state.loguser);
  const showrate = useSelector((state)=> state.detailescard)
  
  return (
    <BrowserRouter>  
        <div  style={{filter:show.show || showrate.showrate.showrate || (show.ok?false:showrate.showfavorite) || showrate.showopinion || showrate.showshare?'blur(5px)':''}}className="App">
          <Panier/> 
          <Routes>
            <Route path='/' element={<Home/> }/>
            <Route path='/detailes/:id' element={ <Detailes/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/favorites' element={<Favorites/>}/>
            <Route path='/history' element={<History/>}/>
            <Route path='/notifications' element={<Notifications/>}/>
            <Route path='/account' element={<Account/>}/>

           
          </Routes>
          
          <Footer/>
          
       </div>
        <Opinion/>
        <Rate/> 
        <Share/>
        <Loguser/>
        {/* <ProfileCard/> */}
       
    </BrowserRouter>
    
  );
}

export default App;
