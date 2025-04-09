import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
return (
<div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
    <div className ="mb-4 flex items-center justify-center px-10 py-2 rounded-lg  bg-green-500 " >
        <Link href="/" className="flex  items-center justify-start w-full ">
        <img src="/logo/logo.png" alt="Logo" className="w-20 h-[60px] mr-6 rounded-full" />
        <span
            className="text-transparent text-nowrap  -ml-10 sm:-ml-0  bg-clip-text bg-gradient-to-r from-yellow-400 to-green-500 text-4xl font-extrabold drop-shadow-lg">
            স্বপ্ন{" "}
            <span className="text-3xl text-white font-semibold">
                Mela
            </span>
        </span>
        </Link>
    </div>

    <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
        {children}
    </div>
</div>
);
}
