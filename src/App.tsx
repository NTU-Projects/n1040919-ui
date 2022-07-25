import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  
  useParams
} from "react-router-dom";
import Homepage from './Pages/Homepage';
import CompanyList from './Pages/CompanyList';
import CompanyDetails from './components/companyDetails'; 
import Portfolio from './components/Portfolio';

export const CurrencyContext = React.createContext<any>({value:'USD',label:'USD'});
function App() {
  const [values,setValues] = React.useState<any>({value:'USD',label:'USD'});
  return (
    <>
    <CurrencyContext.Provider value={values}>
    <Router>
    <div className="App">
      <Homepage setValues={(values)=>setValues(values)}/> 
    <Routes>
    
      <Route path='/:uid/companies' element={<CompanyList></CompanyList>}>
      
      </Route>
     <Route path='/:uid/companies/:id' element={ <CompanyDetails></CompanyDetails>}>
      
     </Route>
     <Route path='/:uid/portfolio/' element={<Portfolio></Portfolio>}> 
     </Route>
    </Routes>
    </div>
    </Router>
    </CurrencyContext.Provider>
    </>
  ); 
}

export default App;
