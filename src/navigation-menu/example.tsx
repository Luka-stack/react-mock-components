import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '.';

export default function NavigationMenuExample() {
  return (
    <div className="flex items-start justify-center">
      <div>
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
              <NavigationMenuLink href="google.com">
                Open Google
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
