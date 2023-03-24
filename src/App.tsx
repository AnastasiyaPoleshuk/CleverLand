import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { LayoutMainPage } from './components/LayoutMainPage/LayoutMainPage';
import { AuthorizationPage } from './pages/AuthorizationPage/AuthorizationPage';
import { BookPage } from './pages/Book/BookPage';
import { Contract } from './pages/Contract/Contract';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { MainPage } from './pages/Main/MainPage';
import { Profile } from './pages/Profile/Profile';
import { Registration } from './pages/Registration/Registration';
import { ResetPassword } from './pages/ResetPassword/ResetPassword';
import { Terms } from './pages/Terms/Terms';


export const App = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route element={<LayoutMainPage />}>
                <Route path='/' element={<Navigate to='/books/all' />} />
                <Route path='/books/:category' element={<MainPage />} />
                <Route path="/contract" element={<Contract />} />
                <Route path="/terms" element={<Terms />} />
            </Route>
            <Route path='books/:category/:bookId' element={<BookPage />} />
            <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/registration' element={<Registration />} />
        <Route path='/auth' element={<AuthorizationPage />} />
        <Route path='/forgot-pass' element={<ForgotPassword />} />
        <Route path='/reset-pass' element={<ResetPassword />} />
    </Routes>
);
