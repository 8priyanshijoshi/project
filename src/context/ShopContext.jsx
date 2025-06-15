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

    // ✅ Load orders from local storage on mount
    useEffect(() => {
        const savedOrders = localStorage.getItem("orders");
        if (savedOrders && savedOrders !== "[]") {
            setOrders(JSON.parse(savedOrders));
            console.log("✅ Loaded Orders from Local Storage:", JSON.parse(savedOrders));
        }
    }, []);

    const addToCart = (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        let cartData = structuredClone(cartItems);
        cartData[itemId] = cartData[itemId] || {};
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        setCartItems(cartData);
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            }
        }
        return totalCount;
    };

    const updateQuantity = (itemId, size, quantity) => {
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

    const placeOrder = async () => {
        if (Object.keys(cartItems).length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        let newOrder = {
            orderId: Date.now(),
            items: cartItems,
            date: new Date().toLocaleDateString(),
        };

        setOrders((prevOrders) => {
            const updatedOrders = [...prevOrders, newOrder];

            // ✅ Save orders to local storage **AFTER** state updates
            setTimeout(() => {
                localStorage.setItem("orders", JSON.stringify(updatedOrders));
                console.log("✅ Orders Saved to Local Storage:", updatedOrders);
            }, 100); // Small delay ensures state update

            return updatedOrders;
        });

        setCartItems({});
    };

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
