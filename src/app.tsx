export function App() {
  return (
    <div className="grid gap-2">
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <Card key={i} id={i.toString()} />
        ))}
    </div>
  );
}

function Card({ id }: { id: string }) {
  return (
    <div className="p-4 border rounded-md">
      <h1>{id}</h1>
    </div>
  );
}
