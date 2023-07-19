"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { SignupSchema, SignupType } from "@/lib/validators/sign-up-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {  Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const SignUpForm = () => {
  const router = useRouter();
  const [image, setImage] = useState<string>("");
  const form = useForm<SignupType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      imageUrl: "",
      name: "",
      password: "",
    },
  });

  // const onUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const { mutate: onRegister, isLoading: isRegistering } = useMutation({
    mutationFn: async ({ email, name, password, imageUrl }: SignupType) => {
      const payload: SignupType = {
        email,
        name,
        password,
        imageUrl,
      };

      const { data } = await axios.post("/api/users", payload);

      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          return toast({
            title: "Invalid Credentials",
            variant: "destructive",
          });
        }

        if (error.response?.status === 422) {
          return toast({
            title: "Not Allowed",
            variant: "destructive",
          });
        }

        if (error.response?.status === 500) {
          return toast({
            title: "Error occured in the Server",
            variant: "destructive",
          });
        }
      }
      return toast({
        title: "Something went wrong",
      });
    },
    onSuccess: () => {
      router.push("/sign-in");
      return toast({
        title: "Successfully signed in",
        variant: "success",
      });
    },
  });

  const onSubmit: SubmitHandler<SignupType> = (data: SignupType) => {
    const payload: SignupType = {
      name: data.name,
      email: data.email,
      password: data.password,
      imageUrl: data.imageUrl,
    };

    onRegister(payload);
  };

  return (
    <div className="">
      <div className="container">
        <Card className="max-w-lg mx-auto my-10">
          <CardHeader>
            <CardTitle>Register Form</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter the Name" />
                      </FormControl>
                      <FormDescription>
                        This is Your Public display Name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter the Email" />
                      </FormControl>
                      <FormDescription>This is Your Email</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter the Name" />
                      </FormControl>
                      <FormDescription>This is Your Password</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="imageUrl"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image Upload</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value ? [field.value] : []}
                          onChange={(url) => field.onChange(url)}
                          onRemove={() => field.onChange("")}
                        />
                      </FormControl>
                      <FormDescription>This is Your Imge</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="my-3 w-full md:w-fit">
                  {isRegistering ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <Separator className="my-3" />
          <CardFooter className="max-w-xs mx-auto">
            Already Have An Account?{" "}
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({
                  variant: "link",
                })
              )}
            >
              Sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUpForm;
