import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ parts }: {parts: CoursePart[]}) => {
  return (
    <div>
      {
        parts.map(part => {
          console.log(part)
          return <Part key={part.name} part={part} />
        })
      }
    </div>
  );
};

export default Content;