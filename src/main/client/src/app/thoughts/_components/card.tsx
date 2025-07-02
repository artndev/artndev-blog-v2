export default function ThoughtCard({ title, content, updated }: { 
  title: string; 
  content: string; 
  updated: string 
}) {
  return (
    <>
      <div className="flex flex-col gap-3 min-w-[250px] max-w-[500px]">
        <span className="text-2xl font-semibold">
          {title}
        </span>
        <span>
          {content}
        </span>
        <span className="text-(--muted-foreground)">
          {updated}
        </span>
      </div>
    </>
  );
}
