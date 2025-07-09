
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import MainLayout from './Layout/MainLayout';
import ChatPage from './pages/ChatPage';
import SearchPage from './pages/SearchPage';
import AlbumPage from './pages/AlbumPage';
import AdminPage from './pages/AdminPage';
import {Toaster} from "react-hot-toast"
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
     <Routes>
     
      <Route path="/auth-callback" element={<AuthCallbackPage/>} />
      <Route path="/admin" element={<AdminPage/>} />
      <Route element={<MainLayout/>}>
        <Route path = "/" element={<HomePage/>}/>
        <Route path = "/chat" element={<ChatPage/>}/>
        <Route path = "/search" element={<SearchPage/>}/>
        <Route path = "/albums/:albumId" element={<AlbumPage/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Route>
     </Routes>
     <Toaster/>
    </>
    
  );
}
