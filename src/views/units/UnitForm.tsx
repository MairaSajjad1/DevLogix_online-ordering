import { FC, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BiLoaderAlt as Loader } from "react-icons/bi";
import toast from "react-hot-toast";
import { Unit } from "./index";
import { useSession } from "next-auth/react";
import { useCreateUnitMutation } from "@/store/services/unitService";

const formSchema = z.object({
  actual_name: z.string().min(1, { message: "Name is required." }),
  short_name: z.string().min(1, { message: "Short name is required." }),
  allow_decimal: z.coerce.number(),
  business_id: z.coerce.number(),
});

interface UnitFormProps {
  setOpen: () => void;
  data?: Unit | null;
}

const UnitForm: FC<UnitFormProps> = ({ setOpen, data }) => {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      actual_name: data?.actual_name || "",
      short_name: data?.short_name || "",
      allow_decimal: data?.allow_decimal || 0,
      business_id: data?.business_id || Number(session?.user?.business_id),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    data
      ? toast.error("Update API is not Implemented Yet")
      : create({ data: values });
  }

  const [create, createResponse] = useCreateUnitMutation();

  const {
    isLoading: createLoading,
    isError: createError,
    isSuccess: createSuccess,
  } = createResponse;

  useEffect(() => {
    if (createError) {
      toast.error("Something Wrong.");
    }
    if (createSuccess) {
      toast.success("Unit Added Successfully.");
      setOpen();
    }
  }, [createError, createSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="actual_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="short_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Name</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allow_decimal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Decimal Allowed</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={createLoading} className="w-full" type="submit">
          {createLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {data ? "Update" : "Add"}
        </Button>
      </form>
    </Form>
  );
};

export default UnitForm;
