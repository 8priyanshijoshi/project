import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [orders, setOrders] = useState([]);

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            let itemInfo = products.find((product) => product._id == itemId);
            if (!itemInfo) continue;

            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0) {
                    totalAmount += itemInfo.price * cartItems[itemId][size];
                }
            }
        }
        return totalAmount;
    };

    const placeOrder = () => {
        if (Object.keys(cartItems).length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        let newOrder = {
            orderId: Date.now(),
            items: cartItems,
            date: new Date().toLocaleDateString()
        };

        console.log("Before placing order:", orders);

        setOrders((prevOrders) => [...prevOrders, newOrder]); 
        setCartItems({}); 

        console.log("After placing order:", orders); // Debugging log
    };

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    useEffect(() => {
        const savedOrders = localStorage.getItem("orders");
        if (savedOrders) setOrders(JSON.parse(savedOrders));
    }, []);

    useEffect(() => {
        console.log("Updated Cart Items:", cartItems);
    }, [cartItems]);

    const value = {
        Products: products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        orders,
        placeOrder,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;

