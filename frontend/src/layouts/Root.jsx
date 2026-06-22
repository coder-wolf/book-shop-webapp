import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import { Footer2 } from '@/components/footer2';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer2></Footer2>
        </div>
    );
};

export default Root;