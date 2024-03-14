import { useState } from 'react';
import { Gauge, Home, Info, User } from 'lucide-react';

import ReactLogo from '../assets/react.svg';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarItemContent,
  SidebarItemTrigger,
  SidebarLink,
} from '.';
import { cn } from '../lib/utils';

export default function SidebarExample() {
  const [homeMenu, setHomeMenu] = useState(0);
  const [profileMenu, setProfileMenu] = useState(0);
  const [dashboardMenu, setDashboardMenu] = useState(0);

  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />

      <main className="flex h-[calc(100%-58px)]">
        <Sidebar className="border-t-0">
          <SidebarHeader className="flex items-center justify-center py-4">
            <img src={ReactLogo} alt="React Logo" />
          </SidebarHeader>

          <SidebarContent>
            <SidebarItem>
              <SidebarItemTrigger>
                <Home className="w-5 h-5" />
                <span className="text-xs">Home</span>
              </SidebarItemTrigger>
              <SidebarItemContent className="p-0 pt-5 pr-2">
                <ul className="grid space-y-2">
                  <li
                    onClick={() => setHomeMenu(1)}
                    className={cn(
                      'p-2 rounded-r-md hover:bg-slate-800/50 cursor-pointer',
                      homeMenu === 1 && 'bg-blue-950'
                    )}
                  >
                    Home 1
                  </li>
                  <li
                    onClick={() => setHomeMenu(2)}
                    className={cn(
                      'p-2 rounded-r-md hover:bg-slate-800/50 cursor-pointer',
                      homeMenu === 2 && 'bg-blue-950'
                    )}
                  >
                    Home 2
                  </li>
                  <li
                    onClick={() => setHomeMenu(3)}
                    className={cn(
                      'p-2 rounded-r-md hover:bg-slate-800/50 cursor-pointer',
                      homeMenu === 3 && 'bg-blue-950'
                    )}
                  >
                    Home 3
                  </li>
                  <li
                    onClick={() => setHomeMenu(4)}
                    className={cn(
                      'p-2 rounded-r-md hover:bg-slate-800/50 cursor-pointer',
                      homeMenu === 4 && 'bg-blue-950'
                    )}
                  >
                    Home 4
                  </li>
                </ul>
              </SidebarItemContent>
            </SidebarItem>
            <SidebarItem>
              <SidebarItemTrigger>
                <Gauge className="w-6 h-6" />
                <span className="text-xs">Dashboard</span>
              </SidebarItemTrigger>
              <SidebarItemContent className="p-0 pt-5 pr-2">
                <ul className="grid space-y-2">
                  <li
                    onClick={() => setDashboardMenu(1)}
                    className={cn(
                      'p-2 rounded-r-md hover:bg-slate-800/50 cursor-pointer',
                      dashboardMenu === 1 && 'bg-blue-950'
                    )}
                  >
                    Dashboard 1
                  </li>
                  <li
                    onClick={() => setDashboardMenu(2)}
                    className={cn(
                      'p-2 rounded-r-md hover:bg-slate-800/50 cursor-pointer',
                      dashboardMenu === 2 && 'bg-blue-950'
                    )}
                  >
                    Dashboard 2
                  </li>
                  <li
                    onClick={() => setDashboardMenu(3)}
                    className={cn(
                      'p-2 rounded-r-md hover:bg-slate-800/50 cursor-pointer',
                      dashboardMenu === 3 && 'bg-blue-950'
                    )}
                  >
                    Dashboard 3
                  </li>
                </ul>
              </SidebarItemContent>
            </SidebarItem>
            <SidebarItem>
              <SidebarItemTrigger>
                <User className="w-6 h-6" />
                <span className="text-xs">Profile</span>
              </SidebarItemTrigger>
              <SidebarItemContent className="p-0 pt-5 pr-2">
                <ul className="grid space-y-2">
                  <li
                    onClick={() => setProfileMenu(1)}
                    className={cn(
                      'p-2 rounded-r-md hover:bg-slate-800/50 cursor-pointer',
                      profileMenu === 1 && 'bg-blue-950'
                    )}
                  >
                    Profile 1
                  </li>
                  <li
                    onClick={() => setProfileMenu(2)}
                    className={cn(
                      'p-2 rounded-r-md hover:bg-slate-800/50 cursor-pointer',
                      profileMenu === 2 && 'bg-blue-950'
                    )}
                  >
                    Profile 2
                  </li>
                </ul>
              </SidebarItemContent>
            </SidebarItem>
          </SidebarContent>

          <SidebarFooter className="flex items-center justify-center">
            <SidebarLink>
              <Info className="w-7 h-7" />
              <span className="text-xs">More info</span>
            </SidebarLink>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col w-full h-full p-4 space-y-4 overflow-y-auto">
          <div className="flex-none w-full rounded-md h-1/3 bg-red-950" />
          <div className="flex-none w-full rounded-md h-1/3 bg-yellow-950" />
          <div className="flex-none w-full rounded-md h-1/3 bg-green-950" />
          <div className="flex-none w-full rounded-md h-1/3 bg-red-950" />
          <div className="flex-none w-full rounded-md h-1/3 bg-yellow-950" />
          <div className="flex-none w-full rounded-md h-1/3 bg-green-950" />
          <div className="flex-none w-full rounded-md h-1/3 bg-red-950" />
          <div className="flex-none w-full rounded-md h-1/3 bg-yellow-950" />
          <div className="flex-none w-full rounded-md h-1/3 bg-green-950" />
        </div>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="p-4 border border-slate-500 text-slate-200">
      HEADER
    </header>
  );
}
