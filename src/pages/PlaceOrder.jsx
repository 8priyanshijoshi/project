import React, { useState, useContext } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const { placeOrder } = useContext(ShopContext);
    const navigate = useNavigate();

    // ✅ Track form input state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        phone: '',
    });

    // ✅ Track validation errors
    const [errors, setErrors] = useState({});

    // ✅ Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear error on change
    };

    // ✅ Validation function
    const validateForm = () => {
        let newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.street.trim()) newErrors.street = "Street is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
        if (!formData.country.trim()) newErrors.country = "Country is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Invalid phone number";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // ✅ Return true if no errors
    };

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            await placeOrder(); // ✅ Ensures orders are saved before navigation
            setTimeout(() => navigate('/orders'), 300); // ✅ Small delay ensures storage update
        }
    };

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t '>
            {/* Left Side */}
            <form className='flex flex-col gap-4 w-full sm:max-w-[480px]' onSubmit={handleSubmit}>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
                </div>
                <div className='flex gap-3'>
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" name="firstName" placeholder='First Name' value={formData.firstName} onChange={handleChange}/>
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" name="lastName" placeholder='Last Name' value={formData.lastName} onChange={handleChange}/>
                </div>
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                
                <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" name="email" placeholder='Email Address' value={formData.email} onChange={handleChange}/>
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" name="street" placeholder='Street' value={formData.street} onChange={handleChange}/>
                {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}

                <div className='flex gap-3'>
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" name="city" placeholder='City' value={formData.city} onChange={handleChange}/>
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" name="state" placeholder='State' value={formData.state} onChange={handleChange}/>
                </div>
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}

                <div className='flex gap-3'>
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" name="pincode" placeholder='Pincode' value={formData.pincode} onChange={handleChange}/>
                    <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" name="country" placeholder='Country' value={formData.country} onChange={handleChange}/>
                </div>
                {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}

                <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" name="phone" placeholder='Phone' value={formData.phone} onChange={handleChange}/>
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                
                <button type="submit" className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            </form>

            {/* Right Side - Payment & Summary */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal/>
                </div>
                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'}/>
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
