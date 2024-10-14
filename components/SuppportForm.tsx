"use client";

import { formSchema } from "@/app/sensitive-info/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function SupportForm() {
  // Allows us to set an error message on the form.
  const {
    setError,
    formState: { errors },
  } = useForm();
  // Used to navigate to the welcome page after a successful form submission.
  const router = useRouter();

  // Set up the form with the Zod schema and a resolver.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supportMessage:
        "I ordered a hat from your store and would like to request a refund. My credit card number is 4111111111111111 ",
    },
  });

  // Define a submit handler called when the form is submitted. It sends the
  // form data to an API endpoint and redirects to the welcome page on success.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // values is guaranteed to be of the correct type by the Zod schema.
    const result = await fetch("/sensitive-info/test", {
      body: JSON.stringify(values),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the request was successful and redirect to the welcome page if
    // so. Otherwise, set a root error message.
    if (result.ok) {
      router.push("/sensitive-info/submitted");
    } else {
      const statusText = result?.statusText || "Service error";
      const error = await result.json();
      const errorMessage = error?.message || statusText;

      setError("root.serverError", {
        message: `We couldn't submit the form: ${errorMessage}`,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="supportMessage" // The name of the field in the form schema.
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please enter your message."
                  className="h-24 w-80 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {errors.root?.serverError && (
                <FormMessage>{errors.root.serverError.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
