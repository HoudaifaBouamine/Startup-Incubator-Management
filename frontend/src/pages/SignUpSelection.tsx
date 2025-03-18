import { Link } from "react-router-dom";

const SignUpSelection = () => {

    return (
      <div>
        <h2>Choose Your Role</h2>
        <Link to={"/signup/student"} >Student</Link>
        <Link to={"/signup/professor"}>Professor</Link>
      </div>
    );
  };
export default SignUpSelection