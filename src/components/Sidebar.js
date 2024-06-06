import React from 'react';
import { FcReuse } from "react-icons/fc";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../lib/const/navigation';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useAuth } from '../context/AuthContext';

const linkClasses =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-green-500 hover:no-underline active:bg-green-300 rounded-sm text-base'

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      console.log('/login');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <div className="bg-ezwcColor w-60 p-3 flex flex-col">
      <div className='flex items-center gap-2 px-1 py-3'>
        <FcReuse fontSize={37}/>
        <span className='text-lg font-extrabold'>eZWC Admin</span>
      </div>
      <div className='flex-1 py-8 flex flex-col gap-0.5'>
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item ={item} />
        ))}
      </div>
      <div>
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          item.key === 'logout' ? (
            <div
              key={item.key}
              onClick={handleLogout}
              className={classNames('cursor-pointer', linkClasses)}
            >
              <span className='text-xl'>{item.icon}</span>
              {item.label}
            </div>
          ) : (
            <SidebarLink key={item.key} item={item} />
          )
        ))}
      </div>
    </div>
  );
};

function SidebarLink({ item }){
  const {pathname} =useLocation()

  return (
    <Link to={item.path} className={classNames(pathname === item.path ? 'text-white bg-green-500' : '',linkClasses)}>
      <span className='text-xl'>{item.icon}</span>
      {item.label}
    </Link>
  )
}