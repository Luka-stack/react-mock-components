import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Cards,
} from '.';
import { Avatar, AvatarImage } from '../avatar';
import { Badge } from '../badge';

export default function CardsCarouselExample() {
  return (
    <div>
      <Cards>
        <Card>
          <CardHeader>
            <CardDescription>
              <b className="mr-3 text-slate-200">Article</b>
              Aug 11, 2023
            </CardDescription>

            <CardTitle>
              Halfmoon: A Bootstrap Alternative with Dark Mode Built In
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col justify-between text-slate-500">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              ipsum unde quos aliquid magni neque at et rem dolorum dolores
              possimus impedit doloremque,
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge>html</Badge>
              <Badge>reactjs</Badge>
              <Badge>nextjs</Badge>
              <Badge>css</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="justify-between">
          <CardHeader>
            <CardDescription>
              <b className="mr-3 text-slate-200">Article</b>
              Aug 11, 2023
            </CardDescription>

            <CardTitle>
              Halfmoon: A Bootstrap Alternative with Dark Mode Built In
            </CardTitle>
          </CardHeader>

          <div className="flex space-x-5">
            <Avatar>
              <AvatarImage
                src="https://avatars.githubusercontent.com/u/34352823?v=4"
                alt="@luka-stack"
              />
            </Avatar>

            <div>
              <p className="text-xs text-slate-500">Author</p>
              <p className="text-lg text-slate-200">Luka - Stack</p>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>
              <b className="mr-3 text-slate-200">Article</b>
              Aug 11, 2023
            </CardDescription>

            <CardTitle>
              Halfmoon: A Bootstrap Alternative with Dark Mode Built In
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col justify-between text-slate-500">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              ipsum unde quos aliquid magni neque at et rem dolorum dolores
              possimus impedit doloremque,
            </div>

            <div className="flex flex-col mt-5 space-y-5">
              <div className="flex space-x-5">
                <Avatar>
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/34352823?v=4"
                    alt="@luka-stack"
                  />
                </Avatar>

                <div>
                  <p className="text-xs text-slate-500">Author</p>
                  <p className="text-lg text-slate-200">Luka - Stack</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge>html</Badge>
                <Badge>reactjs</Badge>
                <Badge>nextjs</Badge>
                <Badge>css</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>
              <b className="mr-3 text-slate-200">Article</b>
              Aug 11, 2023
            </CardDescription>

            <CardTitle>
              Halfmoon: A Bootstrap Alternative with Dark Mode Built In
            </CardTitle>
          </CardHeader>

          <CardContent className="text-slate-500">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              ipsum unde quos aliquid magni neque at et rem dolorum dolores
              possimus impedit doloremque,
            </div>
          </CardContent>

          <div className="flex flex-col mt-5 space-y-5">
            <div className="flex space-x-5">
              <Avatar>
                <AvatarImage
                  src="https://avatars.githubusercontent.com/u/34352823?v=4"
                  alt="@luka-stack"
                />
              </Avatar>

              <div>
                <p className="text-xs text-slate-500">Author</p>
                <p className="text-lg text-slate-200">Luka - Stack</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge>html</Badge>
              <Badge>reactjs</Badge>
              <Badge>nextjs</Badge>
              <Badge>css</Badge>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>
              <b className="mr-3 text-slate-200">Article</b>
              Aug 11, 2023
            </CardDescription>

            <CardTitle>
              Halfmoon: A Bootstrap Alternative with Dark Mode Built In
            </CardTitle>
          </CardHeader>

          <CardContent className="text-slate-500">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              ipsum unde quos aliquid magni neque at et rem dolorum dolores
              possimus impedit doloremque, quo nesciunt, minima,
            </div>
          </CardContent>
        </Card>
      </Cards>
    </div>
  );
}
