import SignUpForm from "./components/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up to Full Quran",
};

export default function SignupPage() {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
