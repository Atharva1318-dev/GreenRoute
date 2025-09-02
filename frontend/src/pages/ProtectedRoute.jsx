// ProtectedRoute.jsx
import React, { use, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const [isAuth, SetIsAuth] = useState(null);
    const [checking, SetChecking] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("http://localhost:8080/auth/verify", {
                    withCredentials: true, //sending our cookie
                });

                if (res.data?.success) {
                    SetIsAuth(true);
                } else {
                    SetIsAuth(false);
                }
            } catch (err) {
                console.log("Auth falied", err);
                SetIsAuth(false);
            } finally {
                SetChecking(false);
            }
        };

        checkAuth();
    }, []);

    if (checking) return <div>Loading...</div>;

    // If not authenticated, redirect to /auth
    if (!isAuth) return <Navigate to="/auth" replace />;

    return children;  // here children means ki Is component ke andar nesting mai joh hoga voh
};

export default ProtectedRoute;
