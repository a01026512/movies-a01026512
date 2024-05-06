import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

const PrivateRouter = () => {
    return (
        <div className='layout min-h-screen'>
            <Header />
            <main className='panel'>
                <Outlet />
            </main>
        </div>
    );
};

export default PrivateRouter;