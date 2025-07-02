import ThoughtCard from "./_components/thought-card";
import { getArticles } from "./actions";

export default async function ThoughtsPage() {
  // const data = [
  //   {
  //     id: "1",
  //     title: "Test",
  //     content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?",
  //     updated: "02/07/2025",
  //   },
  //   {
  //     id: "1",
  //     title: "Test",
  //     content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?",
  //     updated: "02/07/2025",
  //   },
  //   {
  //     id: "1",
  //     title: "Test",
  //     content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?",
  //     updated: "02/07/2025",
  //   },
  //   {
  //     id: "1",
  //     title: "Test",
  //     content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?",
  //     updated: "02/07/2025",
  //   },
  //   {
  //     id: "1",
  //     title: "Test",
  //     content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio esse quis nemo, deserunt delectus dolore omnis non nisi molestias natus. Architecto accusamus cum, mollitia distinctio culpa temporibus quas enim voluptate?",
  //     updated: "02/07/2025",
  //   }
  // ]
  const data = await getArticles()

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center gap-12 max-w-[1000px]">
        {data?.answer && data.answer.map((val, i) => {
          return <ThoughtCard 
            id={val.Id.toString()}
            title={val.Title}
            content={val.Content}
            updated={val.Updated}
            key={i}
          />
        })}
      </div>
    </div>
  );
}
