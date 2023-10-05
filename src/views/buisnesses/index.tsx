// "use client";
// import { FC, useCallback, useEffect, useMemo, useState } from "react";
// import toast from "react-hot-toast";
// import { ColumnDef } from "@tanstack/react-table";
// import { GoPlusCircle as PlusCircle } from "react-icons/go";
// import Table from "@/components/table";
// import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
// import { DataTableRowActions } from "@/components/table/data-table-row-actions";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import { useGetBuisnessesQuery } from "@/store/services/buisnessService";
// import DeleteModal from "@/components/modal/delete-modal";
// import Link from "next/link";
// // import CreateBusiness from "./CreateBusiness";
// import { useSession } from "next-auth/react";

// export interface Buisness {
//   id: number;
//   name: string;
//   address: string;
//   city: string;
//   state: string;
//   landmark: string;
//   tax_id: any;
//   country: string;
//   created_at: string;
//   updated_at: string;
//   last_updated_by: any;
//   owner_details: OwnerDetails;
// }

// interface OwnerDetails {
//   name: string;
//   username: string;
//   password: string;
//   user_type: string;
//   mobile_no: string;
// }


// const Buisnesses: FC = () => {
//   const {
//     data: buisnessesList,
//     isLoading: buisnessesLoading,
//     isFetching: buisnessesFetching,
//     // @ts-ignore
//   } = useGetBuisnessesQuery();

//   const [open, setOpen] = useState<boolean>(false);
//   const [openDelete, setOpenDelete] = useState<boolean>(false);

//   const [selectedBuisness, setSelectedBuisness] = useState<Buisness | null>(
//     null
//   );

//   const columns: ColumnDef<Buisness | null>[] = useMemo(
//     () => [
//       {
//         accessorKey: "name",
//         header: ({ column }) => (
//           <DataTableColumnHeader column={column} title="Name" />
//         ),
//         cell: ({ row }) => (
//           <>
//             {row?.original ? (
//               <div>{row.getValue("name")}</div>
//             ) : (
//               <Skeleton className="w-40 h-4 bg-[#F5f5f5]" />
//             )}
//           </>
//         ),
//         enableSorting: true,
//         enableHiding: false,
//       },
//       {
//         accessorKey: "address",
//         header: ({ column }) => (
//           <DataTableColumnHeader column={column} title="Address" />
//         ),
//         cell: ({ row }) => (
//           <>
//             {row?.original ? (
//               <div>{row.getValue("address")}</div>
//             ) : (
//               <Skeleton className="w-40 lg:w-56 h-4 bg-[#F5f5f5]" />
//             )}
//           </>
//         ),
//         enableSorting: true,
//         enableHiding: true,
//       },
//       {
//         accessorKey: "city",
//         header: ({ column }) => (
//           <DataTableColumnHeader column={column} title="City" />
//         ),
//         cell: ({ row }) => (
//           <>
//             {row?.original ? (
//               <div>{row.getValue("city")}</div>
//             ) : (
//               <Skeleton className={`w-10 lg:w-16 h-4 bg-[#F5f5f5]`} />
//             )}
//           </>
//         ),
//         enableSorting: true,
//         enableHiding: true,
//       },
//       {
//         accessorKey: "state",
//         header: ({ column }) => (
//           <DataTableColumnHeader column={column} title="State" />
//         ),
//         cell: ({ row }) => (
//           <>
//             {row?.original ? (
//               <div>{row.getValue("state")}</div>
//             ) : (
//               <Skeleton className={`w-10 lg:w-16 h-4 bg-[#F5f5f5]`} />
//             )}
//           </>
//         ),
//         enableSorting: true,
//         enableHiding: true,
//       },
//       {
//         accessorKey: "country",
//         header: ({ column }) => (
//           <DataTableColumnHeader column={column} title="Country" />
//         ),
//         cell: ({ row }) => (
//           <>
//             {row?.original ? (
//               <div>{row.getValue("country")}</div>
//             ) : (
//               <Skeleton className={`w-10 lg:w-16 h-4 bg-[#F5f5f5]`} />
//             )}
//           </>
//         ),
//         enableSorting: true,
//         enableHiding: true,
//       },
//       {
//         id: "actions",
//         cell: ({ row }) => (
//           <DataTableRowActions
//             deleteAction={handleDelete}
//             editAction={handleEdit}
//             row={row}
//           />
//         ),
//       },
//     ],
//     []
//   );

//   const loadingData = Array.from({ length: 10 }, () => null);

//   const toggleModal = useCallback(() => {
//     setOpen((open) => !open);
//   }, [open]);

//   const toggleDeleteModal = useCallback(() => {
//     setOpenDelete((open) => !open);
//   }, [open]);

//   const handleEdit = (data: Buisness | null) => {
//     setSelectedBuisness(data);
//     toggleModal();
//   };

//   const handleDelete = (data: Buisness | null) => {
//     setSelectedBuisness(data);
//     toggleDeleteModal();
//   };

//   const confirmDelete = () => {
//     toast.error("Delete API is not implemented yet.");
//     toggleDeleteModal();
//   };

//   useEffect(() => {
//     if (!open && !openDelete) {
//       setSelectedBuisness(null);
//     }
//   }, [open, openDelete]);

//   return (
//     <>
//       <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="font-semibold text-xl text-[#4741E1]">Buisnesses</h1>
//             <p className="font-medium text-sm">A List of all the buisnesses</p>
//           </div>
//           <Button asChild size={"sm"}>
//           <Link href={"/settings/buisnesses/create"}>
//               <PlusCircle className="mr-2 w-4 h-4" />
//               Add Business
//             </Link>
//           </Button>  
//         </div>
//         <Separator />
//         <Table
//           // @ts-expect-error
//           columns={columns}
//           data={
//             buisnessesLoading || buisnessesFetching
//               ? loadingData
//               : buisnessesList || []
//           }
//           filterKey="name"
//         />
//       </div>
//       <DeleteModal
//         open={openDelete}
//         setOpen={toggleDeleteModal}
//         loading={false}
//         confirmDelete={confirmDelete}
//       />
//     </>
//   );
// };

// export default Buisnesses;



"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BiLoaderAlt as Loader } from "react-icons/bi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useCreateBuisnessMutation } from "@/store/services/buisnessService";


const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    address: z.string().min(1, { message: "Address is required." }),
    city: z.string().min(1, { message: "City is required." }),
    state: z.string().min(1, { message: "State is required." }),
    country: z.string().min(1, { message: "Country is required." }),
    landmark: z.string().min(1, { message: "Landmark is required." }), 
    owner_details: z.object({
      name: z.string().min(1, { message: "Owner's name is required." }), 
      username: z.string().min(1, { message: "Username is required." }),
      password: z.string().min(1, { message: "Password is required." }),
      // user_type: z.string().min(1, { message: "User type is required." }),
      mobile_no: z.string().min(1, { message: "Mobile number is required." }),
    }),
  });

//   interface BusinessFormProps {
//     setOpen: () => void;
//     data?: Buisness | null;
//   }

const Create = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:   "",
      address:   "",
      city:   "",
      state:   "",
      country:  "",
      landmark:  "",
      owner_details: {
        name:"",
        username: "",
        password: "",
        // user_type:"",
        mobile_no:"",
      },
    },
  });

  const [create, createResponse] = useCreateBuisnessMutation();

  const {
    isLoading: createLoading,
    isError: createError,
    isSuccess: createSuccess,
  } = createResponse;

  useEffect(() => {
    if (createError) {
      toast.error("Something went wrong.");
    }
    if (createSuccess) {
      toast.success("business Added Successfully.");
      router.push("/settings/buisnesses");
    }
  }, [createError, createSuccess]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    create({
      data: values,
    });
  }
  return (
    <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
      <h1 className="text-[hsl(242,73%,57%)] font-semibold">Add New Business</h1>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="gap-4 grid grid-cols-3 justify-center items-center">
        <FormField
          control={form.control}
          name="name"
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
          name="landmark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Landmark</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner_details.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner's Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner_details.username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner_details.password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input  {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         {/* <FormField
          control={form.control}
          name="owner_details.user_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UserType</FormLabel>
              <FormControl>
                <Input placeholder="UserType" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="owner_details.mobile_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile No</FormLabel>
              <FormControl>
                <Input  {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       <div className="col-span-3 flex items-center justify-center">
            <Button disabled={createLoading} type="submit" className="w-full">
              {createLoading && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add
            </Button>
          </div>
      </form>
      </Form>
    </div>
  );
};

export default Create;

