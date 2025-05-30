import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const PrivateRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <p>Loading...</p>; // Prevent flickering effect

    return user ? children : <Navigate to="/" state={{ from: location }} />;
};

export default PrivateRoute;
