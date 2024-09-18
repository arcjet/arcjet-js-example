"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TextArea } from "./ui/textarea";
import { sensitiveInfoFormSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function SensitiveInfoForm() {
  // Allows us to set an error message on the form.
  const {
    setError,
    formState: { errors },
  } = useForm();

  // Set up the form with the Zod schema and a resolver.
  const form = useForm<z.infer<typeof sensitiveInfoFormSchema>>({
    resolver: zodResolver(sensitiveInfoFormSchema),
    defaultValues: {
      payload:
        "This message will be scanned for sensitive information when submitted",
    },
  });

  // Define a submit handler called when the form is submitted. It sends the
  // form data to an API endpoint and redirects to the welcome page on success.
  async function onSubmit(values: z.infer<typeof sensitiveInfoFormSchema>) {
    console.log(values);
    // values is guaranteed to be of the correct type by the Zod schema.
    const result = await fetch("/sensitive-info/test", {
      body: JSON.stringify(values),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the request was successful
    if (result.ok) {
      // Show success message
      setError("root.serverSuccess", {
        message: "Your message has been successfully submitted.",
      });
    } else {
      const statusText = result?.statusText || "Service error";
      const error = await result.json();
      const errorMessage = error?.message || statusText;

      setError("root.serverError", {
        message: `We couldn't sign you up: ${errorMessage}`,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="payload" // The name of the field in the form schema.
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payload to scan</FormLabel>
              <FormControl>
                <TextArea
                  placeholder="This message will be scanned for sensitive information when submitted"
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
        <Button type="submit">Scan payload</Button>
      </form>
    </Form>
  );
}
