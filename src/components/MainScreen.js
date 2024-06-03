import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function MainScreen() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-row">
      <Sidebar/>
      <div className="flex-1 p-4 min-h-0 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

