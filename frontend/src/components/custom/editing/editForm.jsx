import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "../../ui/button"
import { useEditMetadata } from "../../../services/mutations"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form"
import { Input } from "../../ui/input"


export function EditForm({data, selectedImage}) {

  const editmetadata = useEditMetadata(selectedImage)
  
  const form = useForm(
     {defaultValues: {
      description: null
    }}
    );

    const image = data?.filter((item) => item.id === selectedImage.id);
    const metaData = image[0]?.grouped_metadata.XMP;

     useEffect(() => {
        if (metaData?.Description) {
            form.reset({
                Description: metaData.Description
                // Add other fields here as needed
            });
        }
    }, [selectedImage, metaData, form]);

    if (!image || !selectedImage) {
        return <div>No data</div>;
    }

      
    function onSubmit(formData) {
      
      editmetadata.mutate(formData)
    }

    

    return (
        <>
        <div className="flex justify-center">
            <div>Some common fields are editable</div>
        </div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="Description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
               <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         {editmetadata.isError ? <button type="button" onClick={() => {editmetadata.reset(); form.reset();}} >{editmetadata.error.message
         }</button> :
          <Button type="submit">Save</Button>
          }
        </form>
        </Form>
        </>
    )
}