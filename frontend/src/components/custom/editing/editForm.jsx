import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Textarea } from "../../ui/textarea"
import { Input } from "../../ui/input"
import { useEditMetadata, useEditSuccess } from "../../../services/mutations"
import { Calendar28 } from "./datePicker"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form"

export function EditForm({data, selectedImage, isEditing, setIsEditing}) {
  
  const [autoDownload, setAutoDownload] = useState(false)
  const editmetadata = useEditMetadata(selectedImage)
  const editSuccess = useEditSuccess(selectedImage, setIsEditing)
  
  
  const form = useForm({
    defaultValues: {
      Description: "",
      Headline: "",
      Category: "",
      Keywords: "",
      Credit: "",

    }
  });

  const { isDirty } = form.formState;

  const image = selectedImage
  ? data?.filter(item => item.id === selectedImage.id)
  : null;

const metaData = image?.[0]?.grouped_metadata?.XMP;

useEffect(() => {
  if (metaData) {
    form.reset({
      Description: metaData.Description || "",
      Headline: metaData.Headline || "",
      Category: metaData.Category || "",
      Keywords: metaData.Keywords || "",
      Credit: metaData.Credit || "",
      Copyright: metaData.Rights || "",
      DateCreated: metaData.DateCreated || "",
    });
  } else {
    // Reset to empty when no metaData
    form.reset({
      Description: "",
      Headline: "",
      Category: "",
      Keywords: "",
      Credit: "",
      Copyright: "",
      DateCreated: "",
    });
  }
}, [selectedImage, metaData, form]);

if (!selectedImage || !image) {
  return <div>No data</div>;
}
  
//
function onSubmit(formData) {
    console.log('from editform', formData, autoDownload); // Check what's being submitted
    
    editmetadata.mutate({ 
    formData, 
    autoDownload 
  });
  }

  // Field configurations - separate from form values
  const fields = {
    Description: {
      name: "Description",
      label: "Description",
      placeholder: "Enter Details",
      description: "A description of the image, mostly used for captions.",
      type :  "textarea"
    },
    Category: {
      name: "Category",
      label: "Category",
      placeholder: "Enter Category",
      description: "Categorize the image",
      type :  "input"
    },
    Keywords : {
      name: "Keywords",
      label: "Keywords",
      placeholder: "Enter Category",
      description: "Add relevalnt keywords",
      type :  "input"
    },
     Credit: {
      name: "Credit",
      label: "Credit",
      placeholder: "Enter Credit",
      description: "Credit for image",
      type :  "input"
    },
     Copyright: {
      name: "Copyright",
      label: "Copyright",
      placeholder: "Enter Copyright",
      description: "Copyright holder",
      type :  "input"
    },
     Headline : {
      name: "Headline",
      label: "Headline",
      placeholder: "Enter Headline",
      description: "Headline for the image",
      type :  "textarea"
    },
    DateCreated : {
      name: "DateCreated",
      label: "Date Created",
      placeholder: "Creation Date",
      description: "Date given to image",
      type :  "datepicker"
    }
  }


  const FormSection = ({fieldConfig, className}) => {

    const fixedDate = metaData?.DateCreated ?
    metaData.DateCreated 
    .replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3")
    .replace(" ", "T") : null ;

    const formType = (field) => {
        switch (fieldConfig.type) {
          case 'textarea' :  return (
          <Textarea 
            placeholder={fieldConfig.placeholder} 
            {...field} 
            className="bg-gray-200 text-wrap"
            
          />
        );

        case 'input' : 
        return ( 
          <Input 
            placeholder={fieldConfig.placeholder} 
            {...field} 
            className="bg-gray-200"
          />
        );

         case 'datepicker' :  return (
          <Calendar28 props={{...field}} placeholder={fieldConfig.placeholder} 
          imageDate={ fixedDate  }
        />);


          default : return ( 
          <Input 
            placeholder={fieldConfig.placeholder} 
            {...field} 
            className="bg-gray-200"
           
          />
        );

          
        } 
        
       
    }

    return (
      <FormField 
        control={form.control}
        name={fieldConfig.name}
        
        render={({ field }) => (
          <FormItem className={className}>
            <FormLabel className="dark:text-white">{fieldConfig.label}</FormLabel>
            <FormDescription>
              {fieldConfig.description}
            </FormDescription>
            <FormControl>
             {formType(field)}
             
            </FormControl>
            
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  
  function formStatusHelper() {
    if (editmetadata.isPending) {
      return (autoDownload ? <div>Downloading...</div> : <div>Saving new data</div>)
    }
    if (editmetadata.isSuccess) {
      return (
        <>
        
          <div className="inline p-5">{autoDownload ? 'Data written and image downloaded' :
            'Data successfully written'}</div>
          <button onClick={() => {editSuccess();}}
          
          className="inline mt-4 px-4 py-2 bg-black dark:bg-white text-white rounded
          dark:text-black">Go Back</button>
        </>
      )
    }
    else return (
      <>
      <div className="flex gap-2 pb-12 sm:pb-0">
        <button
          type="submit"
          disabled={!isDirty}
          className={`first-line:mt-4 px-4 py-2 ${
            !isDirty ? `bg-slate-600 cursor-not-allowed` : `bg-black`
          } dark:bg-white text-white rounded
          dark:text-black`}
        >
          Save Changes
        </button>
        
        <label> 
            Auto Download?
            <input type="checkbox" checked={autoDownload} onChange={(e) => setAutoDownload(e.target.checked)} />
        </label>
        

        { !isDirty ? null : <button type="button" onClick={() => form.reset()}
          className={`first-line:mt-4 px-4 py-2 ${
            !isDirty ? `bg-slate-600  cursor-not-allowed` : `bg-black`
          } dark:bg-white text-white rounded
          dark:text-black`}>
          Reset
        </button>}
        </div>
      </>
    ); 
  }

  // function handleKeyDown() {
  //    setSaveButton(false)   
  // }
  
  
  
  
  
  
  return (
    <>
      <div className="flex justify-center">
        <div>Some common fields are editable</div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
        
          className="w-full space-y-4 dark:text-black">
          <div>
            <div>
              <FormSection fieldConfig={fields.Description} />
            </div>
            <div>
                <FormSection fieldConfig={fields.Headline} />
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <div class="min-w-[200px] flex-grow">
              <FormSection fieldConfig={fields.Category} />
            </div>
            <div class="min-w-[200px] flex-grow">
              <FormSection fieldConfig={fields.Credit} />
            </div>
            <div
              class="min-w-[200px]   
              sm:flex-grow-[10]">
              <FormSection fieldConfig={fields.Keywords} />
            </div>
             <div
              class="min-w-[200px]">
              <FormSection fieldConfig={fields.Copyright} />
            </div>
            <div
              class="min-w-[200px]">
              <FormSection fieldConfig={fields.DateCreated} />
            </div>
          </div>
            {formStatusHelper()}
          
        </form>
      </Form>
    </>
  );
}