import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-10">
      <div className="w-full max-w-3xl px-4 md:px-0">
        <div className="mx-auto max-w-xl overflow-hidden rounded-lg bg-white py-12 px-6 md:px-12 shadow-xl transform hover:scale-105 transition-transform duration-300">
          <div className="mb-8 mx-auto  ">
          <h1 className=' text-4xl font-extrabold'>taskIT</h1>
          </div>
          <Outlet />
        </div>
      </div>
    </main>
  );
  
}