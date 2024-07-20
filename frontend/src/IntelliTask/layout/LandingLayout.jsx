import { Outlet, ScrollRestoration } from 'react-router-dom';
import { HeaderLanding } from '../components';

export const LandingLayout = () => {
  return (
    <>
      <HeaderLanding />
      <Outlet />
      <ScrollRestoration />
    </>
  )
}