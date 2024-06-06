'use client';

import axios from 'axios';
import Link from 'next/link';

import { useEffect, useState } from 'react';

export default function Login() {

    useEffect(() => {
        //if params success = true, get user
        const url = new URL(window.location.href);
        const success = url.searchParams.get('success');
        if (success) {
            axios.get('http://localhost:3030/api/auth/user', { withCredentials: true })
                .then((res) => {
                    console.log(res.data);
                    localStorage.setItem('user', JSON.stringify(res.data));
                    window.location.href = '/';
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });

    return (
        <div className='container flex place-content-center items-center h-screen'>
            <div className="flex flex-col gap-2 text-center">
                <h2>Accedi a Paleo League</h2>
                <Link href="http://localhost:3030/api/auth/google">
                    <button className="bg-sky-700 rounded-md p-2">Login with Google</button>
                </Link>
            </div>
        </div>
    )
}