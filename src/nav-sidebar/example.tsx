import { useState } from 'react';
import {
  BarChart,
  Home,
  KanbanSquare,
  LayoutDashboard,
  LineChart,
  ScatterChart,
  SettingsIcon,
  Shield,
  User,
} from 'lucide-react';

import {
  NavSidebar,
  NavSidebarButton,
  NavSidebarContent,
  NavSidebarDropdown,
  NavSidebarFooter,
  NavSidebarGroup,
  NavSidebarHeader,
  NavSidebarLink,
  NavSidebarSeparator,
  NavSidebarMain,
  NavSidebarText,
  NavSidebarTrigger,
} from '.';

export default function App() {
  const [selected, setSelected] = useState(1);

  return (
    <div className="flex w-screen h-screen space-x-5">
      <NavSidebar>
        <NavSidebarContent>
          <NavSidebarHeader>
            <NavSidebarText>Luka-Stack Sidebar</NavSidebarText>
            <NavSidebarTrigger />
          </NavSidebarHeader>

          <NavSidebarMain>
            <NavSidebarLink
              label="Home"
              className="text-sm"
              active={selected === 1}
              onClick={() => setSelected(1)}
            >
              <Home strokeWidth={1} className="flex-none w-6 h-6" />
            </NavSidebarLink>
            <NavSidebarLink
              label="Dashboard"
              className="text-sm"
              active={selected === 2}
              onClick={() => setSelected(2)}
            >
              <LayoutDashboard strokeWidth={1} className="flex-none w-6 h-6" />
            </NavSidebarLink>
            <NavSidebarLink
              label="Account"
              className="text-sm"
              active={selected === 3}
              onClick={() => setSelected(3)}
            >
              <User strokeWidth={1} className="flex-none w-6 h-6" />
            </NavSidebarLink>

            <NavSidebarSeparator />

            <NavSidebarButton label="Security" className="text-sm">
              <Shield strokeWidth={1} className="flex-none w-6 h-6" />
            </NavSidebarButton>

            <NavSidebarGroup label="Other">
              <NavSidebarDropdown
                label="Charts"
                className="text-sm"
                icon={KanbanSquare}
              >
                <NavSidebarLink label="Bar chart" className="text-sm">
                  <BarChart strokeWidth={1} className="flex-none w-6 h-6" />
                </NavSidebarLink>
                <NavSidebarLink label="Scatter chart" className="text-sm">
                  <ScatterChart strokeWidth={1} className="flex-none w-6 h-6" />
                </NavSidebarLink>
                <NavSidebarLink label="Line chart" className="text-sm">
                  <LineChart strokeWidth={1} className="flex-none w-6 h-6" />
                </NavSidebarLink>
              </NavSidebarDropdown>
            </NavSidebarGroup>
          </NavSidebarMain>

          <NavSidebarFooter>
            <NavSidebarButton label="Settings" className="text-sm">
              <SettingsIcon strokeWidth={1} className="flex-none w-6 h-6" />
            </NavSidebarButton>
          </NavSidebarFooter>
        </NavSidebarContent>
      </NavSidebar>

      <main className="flex flex-col flex-1 p-4 space-y-5">
        <div className="flex-1 p-4 bg-red-900 border rounded-md border-slate-500" />
        <div className="flex-1 p-4 bg-yellow-900 border rounded-md border-slate-500" />
        <div className="flex-1 p-4 bg-blue-900 border rounded-md border-slate-500" />
      </main>
    </div>
  );
}
