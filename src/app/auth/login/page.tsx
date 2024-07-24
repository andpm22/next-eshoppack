'use client'
import { titleFont } from '@/config/fonts';
import { LoginForm } from './ui/LoginForm';



export default function LoginPage() {
 
  
  
  
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-40">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Log in</h1>
      <LoginForm />

      
    </div>
  );
}