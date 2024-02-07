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
    <div className="h-screen w-screen bg-slate-950">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger id="first">First</NavigationMenuTrigger>
            <NavigationMenuContent id="first">
              <div>
                <h1>Header First</h1>
                <p>Description</p>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger id="second">Second</NavigationMenuTrigger>
            <NavigationMenuContent id="second">
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
