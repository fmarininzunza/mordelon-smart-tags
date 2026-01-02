
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { MyPets } from './pages/MyPets';
import { PetProfile } from './pages/PetProfile';
import { Alerts } from './pages/Alerts';
import { Auth } from './pages/Auth';
import { CreatePet } from './pages/CreatePet';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PetProvider } from './contexts/PetContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PetProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/pet/:id" element={<PetProfile />} />
              
              {/* Protected Routes */}
              <Route path="/my-pets" element={
                <PrivateRoute>
                  <MyPets />
                </PrivateRoute>
              } />
              <Route path="/create-pet" element={
                <PrivateRoute>
                  <CreatePet />
                </PrivateRoute>
              } />
              <Route path="/alerts" element={
                <PrivateRoute>
                  <Alerts />
                </PrivateRoute>
              } />
            </Routes>
          </Layout>
        </Router>
      </PetProvider>
    </AuthProvider>
  );
};

export default App;
