import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const Home = () => {
    return (_jsxs("div", { children: [_jsx("h1", { className: " text-3xl", children: "Welcome" }), _jsx(Link, { to: '/login', children: "Login" }), _jsx(Link, { to: '/signup', children: "Sign Up" })] }));
};
export default Home;
