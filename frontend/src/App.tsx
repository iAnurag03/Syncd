
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import MainLayout from './Layout/MainLayout';
import ChatPage from './pages/ChatPage';

export default function App() {
  return (
    <>
     <Routes>
     
      <Route path="/auth-callback" element={<AuthCallbackPage/>} />
      <Route element={<MainLayout/>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path ="/chat" element={<ChatPage/>}/>
      </Route>
     </Routes>
    </>
    
  );
}
