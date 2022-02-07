import { createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import TaskForm from "./components/TaskForm";
import TasksList from "./components/TasksList";
import RequireAuth from './authentication/RequireAuth';
import AuthProvider from "./authentication/AuthProvider";
import MissingRoute from "./components/MissingRoute";

function App() {

  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path='/' element={<Navbar />}>
              <Route
                path='/tasks'
                element={
                  <RequireAuth>
                    <TasksList />
                  </RequireAuth>
                }
              />

              <Route
                path='/task/new'
                element={
                  <RequireAuth>
                    <TaskForm />
                  </RequireAuth>
                }
              />

              <Route
                path='/tasks/:id/edit'
                element={
                  <RequireAuth>
                    <TaskForm />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path='*' element={<MissingRoute />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default App;