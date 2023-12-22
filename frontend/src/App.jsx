import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import CreateCustomer from './components/CreateCustomer';
import CustomerList from './components/CustomerList';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/customer-list' element={<CustomerList/>}/>
      <Route path='/create-customer' element={<CreateCustomer/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
