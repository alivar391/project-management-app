import { useParams } from 'react-router';

export function BoardPage() {
  const { boardId } = useParams();
  return (
    <div>
      <p>Board Page {boardId}</p>
    </div>
  );
}
