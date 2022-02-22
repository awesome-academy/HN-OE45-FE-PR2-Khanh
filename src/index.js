import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import './styles/styles.sass'
import './i18n'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { useSelector } from 'react-redux';
import Admin from './Admin/Admin'
import ProductsManager from './Admin/pages/ProductsManager/ProductsManager'
import UsersManager from './Admin/pages/UsersManager/UsersManager'

export function ProtectedRoute() {
  const role = useSelector(state => state.user.role)
  return role === 1 ? <Admin /> : <Navigate to="/" />
}

ReactDOM.render(
  <Suspense fallback="loading...">
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <Routes>           
            <Route path='*' element={<App />}/>
            <Route path='/admin/*' element={<ProtectedRoute />}>
              <Route path='products' element={<ProductsManager />} />
              <Route path='users' element={<UsersManager />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </React.StrictMode>,
  </Suspense>,
  document.getElementById('root')
);
