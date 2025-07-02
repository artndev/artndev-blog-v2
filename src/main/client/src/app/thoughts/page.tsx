import ThoughtCard from "./_components/thought-card";

export default function ThoughtsPage() {
  const data = [
    {
      id: "1",
      title: "Test",
      content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?",
      updated: "02/07/2025",
    },
    {
      id: "1",
      title: "Test",
      content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?",
      updated: "02/07/2025",
    },
    {
      id: "1",
      title: "Test",
      content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?",
      updated: "02/07/2025",
    },
    {
      id: "1",
      title: "Test",
      content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?",
      updated: "02/07/2025",
    },
    {
      id: "1",
      title: "Test",
      content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?",
      updated: "02/07/2025",
    }
  ]

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center gap-12 max-w-[1000px]">
        {data.map((val, i) => {
          return <ThoughtCard 
            id={val.id}
            title={val.title}
            content={val.content}
            updated={val.updated}
            key={i}
          />
        })}
      </div>
    </div>
  );
}
