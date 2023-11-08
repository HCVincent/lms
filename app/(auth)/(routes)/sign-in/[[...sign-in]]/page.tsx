"use client";

import { useState } from "react";
import { useSignIn, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().min(1, {
    message: "Title is required",
  }),
  password: z.string(),
});

export default function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: process.env.NEXT_PUBLIC_ADMIN_SIGN_IN_EMAIL,
      password: process.env.NEXT_PUBLIC_ADMIN_SIGN_IN_PASSWORD,
    },
  });
  const [error, setError] = useState<string | null>(null);
  const clearErrorMessage = () => {
    setError("");
  };
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const { isSubmitting, isValid } = form.formState;
  // start the sign In process.
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: values["email"],
        password: values["password"],
      });
      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }
    } catch (err: any) {
      setError(err.errors[0].longMessage);
      console.error("error", err.errors[0].longMessage);
    }
  };

  return (
    <div className="w-1/3 space-y-4">
      <div className="text-center text-3xl font-bold">Log In</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-start px-3 capitalize text-xs font-bold text-zinc-500 dark:text-secondary/70">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="email"
                    {...field}
                    onChange={(e) => {
                      clearErrorMessage();
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormLabel className="flex justify-start px-3 capitalize text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Password
          </FormLabel>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    {...field}
                    onChange={(e) => {
                      clearErrorMessage();
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
                <div className="flex justify-start px-3 ">
                  Notice: Please use default email and password to sign in as an
                  administrator.
                </div>
                <div className="flex justify-start px-3 text-red-500">
                  {error}
                </div>
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Button
              type="submit"
              className="w-full"
              disabled={!isValid || isSubmitting}
            >
              Log in
            </Button>
          </div>
        </form>
      </Form>
      <div>
        Don&apos;t have an account?{" "}
        <span
          className="text-sky-700 cursor-pointer border-"
          onClick={() => router.push("/sign-up")}
        >
          Sign up
        </span>
      </div>
    </div>
  );
}
