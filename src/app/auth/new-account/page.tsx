import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { RegisterForm } from "./ui/RegisterForm";

export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-40 mb-5">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>New account</h1>
      <RegisterForm />
    </div>
  );
}
