import { Link } from 'react-router-dom';

export function Header() {
  return (
    <div>
      <Link to="/">Main Page</Link>
      <Link to="/welcome">Welcome</Link>
      <Link to="/signin">Signin</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/update-user">UpdateUser</Link>
      <Link to="/board">Board</Link>
    </div>
  );
}
