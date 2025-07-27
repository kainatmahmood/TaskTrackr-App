
import { Navigate} from "react-router-dom";
const ProtectedRoute = ({children , adminOnly = false}) => {
    const user= JSON.parse(localStorage.getItem('user'));
    if(!user)
    {
        return <Navigate to="/?error=unauthorized" replace />;
    }
    if(adminOnly && user.role !== 'admin') {
        return <Navigate to="/dashboard" replace/>
    }
    return children;
};
export default ProtectedRoute;