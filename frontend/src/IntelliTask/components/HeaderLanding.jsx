import { Link } from 'react-router-dom';

export const HeaderLanding = () => {
  return (
    <header className='bg-white border-b'>
      <nav className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 md:gap-0 py-4 mx-4 md:mx-8 lg:mx-0">
          <Link to={'/'}>
            <h1 className='text-3xl font-extrabold'>taskIT</h1>
          </Link>

          <ul className='flex gap-2 mx-2 lg:mx-0'>
            <li>
              <Link
                to='/auth/login'
                className='w-max px-4 py-2 text-base font-bold '
              >
                <span>LogIn</span>
              </Link>
            </li>
            <li>
              <Link
                to='/auth/register'
                className='w-max rounded-lg border bg-taskunity-800 px-4 py-2 text-base text-white font-bold transition-colors hover:bg-opacity-90'
              >
                <span>Register</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}