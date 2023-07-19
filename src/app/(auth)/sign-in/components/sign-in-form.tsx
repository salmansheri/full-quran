"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SigninSchema, SigninType } from "@/lib/validators/sign-in-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SigninForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<SigninType>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SigninType) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
    });

    setIsLoading(false);
  };
  return (
    <div className="container">
      <Card className="max-w-md mx-auto my-5">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your email address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your Password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="my-5 w-full md:w-fit">
                {isLoading ? "Loading..." : "Sign in"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <Separator className="my-2" />
        <CardFooter className="max-w-xs mx-auto">
          New to Full Quran?{" "}
          <Link
            className={cn(
              buttonVariants({
                variant: "link",
              }),
            )}
            href="/sign-up"
          >
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SigninForm;
