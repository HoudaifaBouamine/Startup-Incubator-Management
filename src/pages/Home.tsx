import { Link } from "react-router-dom";
const Home = () => {
    return (
      <div>
        <h1 className=" text-3xl">Welcome</h1>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Sign Up</Link>
      </div>
    );
  };
export default Home