import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu';
import { Button } from './button';

export function App() {
  return (
    <div className="w-screen h-screen bg-slate-950">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>First</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div>
                <h1>Header First</h1>
                <p>Description</p>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Second</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div>
                <h1>Header Second</h1>
                <p>Description</p>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button variant={'outline'}>Third</Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
