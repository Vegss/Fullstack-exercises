import { CoursePart } from "../types";

const Part = ({ part }: {part: CoursePart}) => {

  const assertNever = ({ part }: { part: never }) => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(part)}`
    );
  };

  switch (part.kind) {
    case 'basic':
      return (
        <div>
          <h3><b>{part.name} {part.exerciseCount}</b></h3>
          <i>{part.description}</i>
        </div>
      );
    case 'group':
      return (
        <div>
          <h3><b>{part.name} {part.exerciseCount}</b></h3>
          <p>Project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <h3><b>{part.name} {part.exerciseCount}</b></h3>
          <i>{part.description}</i>
          <p>submit to {part.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <h3><b>{part.name} {part.exerciseCount}</b></h3>
          <i>{part.description}</i>
          <p>required skills: {part.requirements.join(', ')}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;