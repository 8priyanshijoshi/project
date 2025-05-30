import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../firebase'
import { setDoc, doc } from 'firebase/firestore'
import { fnamereg, emailreg } from './reg'

const Register = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [fnameErr, setFnameerr] = useState(false)
    const [EmailErr, setEmailerr] = useState(false)

    const renderErrName = () => {
        setFnameerr(!fnamereg.test(fullname))
    }

    const renderErrEmail = () => {
        setEmailerr(!emailreg.test(email))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    fullname,
                    email: user.email
                })
                alert("User added successfully")
                setFullname("")
                setEmail("")
                setPassword("")
            }
        } catch (e) {
            console.log(e);
            alert("Error (auth/email-already-in-use)")
        }
    }

    return (
        <div className="w-50">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 ml-100 text-gray-800">
                <p className="prata-regular text-3xl">Register</p>

                <input type="text" className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)}
                    onBlur={renderErrName} required />
                {fnameErr && <div className="text-danger">Invalid name format</div>}

                <input type="email" className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                    onBlur={renderErrEmail} required />
                {EmailErr && <div className="text-danger">Invalid email format</div>}

                <input type="password" className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                    required />

                <button className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer"
                    type="submit" disabled={fnameErr || EmailErr || !password}>
                    Register
                </button>

                <Link to="/" className="mx-2">Already have an account? Login</Link>
            </form>
        </div>
    );
};

export default Register;


