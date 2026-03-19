import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
export const useAuth = () => {
    const { user, isAuthLoading, message, error } = useSelector((state) => state.users);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        // user._id or user.name checks if it's the real logged-in user, 
        // not the empty default user object
        if (user && user._id) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, [user]);
    return { isAuth, isAuthLoading, user, message, error };
};
export const useCart = () => {
    const { user } = useSelector((state) => state.users);
    const { Cart } = user || {};

    return { Cart };
}
export const useProduct = () => {
    const { productList, isLoading } = useSelector((state) => state.products);
    return { productList, isLoading };
}
export const useWishlist = () => {
    const { user } = useSelector((state) => state.users);
    const { wishlist } = user || {};
    return { wishlist };
}