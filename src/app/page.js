'use client';

import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import Header from "../components/Header";

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('access')
    if(!token){
      router.push('/login')
    }
    console.log("use effect run ")

},[])


  return (
    <div>
      <Header />
      <main className="mt-20 p-4">
      </main>
    </div>
  );
}
