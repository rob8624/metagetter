import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "../../ui/textarea";
import { Input } from "../../ui/input";
import { useEditMetadata, useEditSuccess } from "../../../services/mutations";
import { DatePicker } from "./dateTimePicker";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

export function EditForm({ data, selectedImage, isEditing, setIsEditing }) {
  const [autoDownload, setAutoDownload] = useState(false);
  const editmetadata = useEditMetadata(selectedImage);
  const editSuccess = useEditSuccess(selectedImage, setIsEditing);

  const form = useForm({
    reValidateMode: "onChange",
    defaultValues: {
      Description: "",
      Headline: "",
      Category: "",
      Keywords: "",
      Credit: "",
    },
  });

  const { isDirty } = form.formState;

  
  //could use find here instead as will ovid using indexing on image
  const image = useMemo(() => selectedImage
    ? data?.filter((item) => item.id === selectedImage.id)
    : null, [selectedImage, data])

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
        DateCreated: metaData.DateCreated || null, //null to stop DRF trying to parse empty string
        CreatorWorkEmail: metaData.CreatorWorkEmail || "",
        CreatorWorkURL: metaData.CreatorWorkURL || "",
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
        CreatorWorkEmail: "",
        CreatorWorkURL: metaData.CreatorWorkURL || "",
      });
    }
  }, [selectedImage, metaData, form]);

  if (!selectedImage || !image) {
    return <div>No data</div>;
  }

 
  function onSubmit(formData) {
    editmetadata.mutate(
      { formData, autoDownload },
      {
        onError: async (error) => {
          let data = error?.response?.data;

          // If backend returned JSON as a Blob
          if (data instanceof Blob) {
            const text = await data.text();
            data = JSON.parse(text);
          }

          // Fallback if nothing usable came back
          if (!data) {
            form.setError("root", {
              type: "server",
              message: "An unexpected server error occurred.",
            });
            return;
          }

          // Form-level error message
          if (data.error) {
            form.setError("root", {
              type: "server",
              message: data.error,
            });
          }

          // Field-level validation errors
          if (data.details) {
            Object.entries(data.details).forEach(([field, messages]) => {
              form.setError(field, {
                type: "server",
                message: Array.isArray(messages)
                  ? messages.join(" ")
                  : messages,
              });
            });
          }
        },
      }
    );
  }

  // Field configurations - separate from form values
  const fields = {
    Description: {
      name: "Description",
      label: "Description",
      placeholder: "Enter Details",
      description: "A description of the image, mostly used for captions.",
      type: "textarea",
    },
    Category: {
      name: "Category",
      label: "Category",
      placeholder: "Enter Category",
      description: "Categorize the image",
      type: "input",
    },
    Keywords: {
      name: "Keywords",
      label: "Keywords",
      placeholder: "Enter Category",
      description: "Add relevalnt keywords",
      type: "input",
    },
    Credit: {
      name: "Credit",
      label: "Credit",
      placeholder: "Enter Credit",
      description: "Credit for image",
      type: "input",
    },
    Copyright: {
      name: "Copyright",
      label: "Copyright",
      placeholder: "Enter Copyright",
      description: "Copyright holder",
      type: "input",
    },
    Headline: {
      name: "Headline",
      label: "Headline",
      placeholder: "Enter Headline",
      description: "Headline for the image",
      type: "textarea",
    },
    DateCreated: {
      name: "DateCreated",
      label: "Date & Time",
      placeholder: "Modify date and time",
      description: "Modify date and time",
      type: "datepicker",
    },
    CreatorWorkEmail: {
      name: "CreatorWorkEmail",
      label: "Creators email",
      placeholder: "Email",
      description: "Email of creator",
      type: "email",
    },
    CreatorWorkURL: {
      name: "CreatorWorkURL",
      label: "XMP Webstatement and CreatorsWorkUrl",
      placeholder: "Website",
      description: "Website of creator",
      type: "input",
    },
  };

  

  function formStatusHelper() {
    if (editmetadata.isPending) {
      return autoDownload ? (
        <div>Downloading...</div>
      ) : (
        <div>Saving new data</div>
      );
    }
    if (editmetadata.isSuccess) {
      return (
        <>
          <div className="inline p-5">
            {autoDownload
              ? "Data written and image downloaded"
              : "Data successfully written"}
          </div>
          <button
            onClick={() => {
              editSuccess();
            }}
            className="inline mt-4 px-4 py-2 bg-black dark:bg-white text-white rounded
          dark:text-black"
          >
            Go Back
          </button>
        </>
      );
    } else
      return (
        <>
          <div className="flex items-center gap-2 pb-12 sm:pb-0">
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
              <input
                type="checkbox"
                checked={autoDownload}
                onChange={(e) => setAutoDownload(e.target.checked)}
              />
            </label>

            {!isDirty ? null : (
              <button
                type="button"
                onClick={() => form.reset()}
                className={`first-line:mt-4 px-4 py-2 ${
                  !isDirty ? `bg-slate-600  cursor-not-allowed` : `bg-black`
                } dark:bg-white text-white rounded
          dark:text-black`}
              >
                Reset
              </button>
            )}
          </div>
        </>
      );
  }

  
 /**
 * Checks if any of the specified fields in a React Hook Form have validation errors.
 *
 * @param {import("react-hook-form").UseFormReturn} form - The React Hook Form instance returned by `useForm()`.
 * @param {string[]} fieldNames - An array of field names to check for errors.
 * @returns {boolean} `true` if at least one field has an error, `false` otherwise.
 *
 * @example
 * const errorExists = hasErrors(form, ["CreatorWorkEmail", "CreatorWorkURL"]);
 * if (errorExists) {
 *   console.log("One or more fields have errors");
 * }
 */
function hasErrors(form, fieldNames) {
  return fieldNames.some((name) => !!form.formState.errors[name]);
}
  
  
  
  return (
    <>
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-3/4">
        <div>Some common fields are editable</div>
      

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 dark:text-black font-raleway"
        >
          <div>
            <div>
              <FormSection fieldConfig={fields.Description}  form={form}
            editmetadata={editmetadata}
            metaData={metaData} className={`pb-10`}/>
            </div>
            <div>
              <FormSection fieldConfig={fields.Headline}  form={form}
            editmetadata={editmetadata}
            metaData={metaData} />
            </div>
          </div>
          <details className="text-center">
            <summary className=
            {`bg-gray-50 pb-5 ${hasErrors(form, ["Category", "Credit", "Keywords", "Copyright", "DateCreated"]) ? 
            "font-bold text-red-600" : ""}`}>Additional data
            </summary>
          <div class="flex flex-wrap justify-center gap-2">
            
              
              <div class="min-w-[200px] flex-grow">
                <FormSection fieldConfig={fields.Category}  form={form}
            editmetadata={editmetadata}
            metaData={metaData} className='text-sm'/>
              </div>
              <div class="min-w-[200px] flex-grow">
                <FormSection fieldConfig={fields.Credit}  form={form}
            editmetadata={editmetadata}
            metaData={metaData} className='text-sm' />
              </div>
              <div
                class="min-w-[200px]   
                sm:flex-grow-[10]"
              >
                <FormSection fieldConfig={fields.Keywords}  form={form}
            editmetadata={editmetadata}
            metaData={metaData} className='text-sm' />
              </div>
              <div class="min-w-[200px]">
                <FormSection fieldConfig={fields.Copyright}  form={form}
            editmetadata={editmetadata}
            metaData={metaData} className='text-sm'/>
              </div>
              <div class="min-w-[200px]">
                <FormSection fieldConfig={fields.DateCreated}  form={form}
            editmetadata={editmetadata}
            metaData={metaData} className='text-sm' />
              </div>
           
          </div>
           </details>
          <hr></hr>
           
            <details className="text-center">
               <summary className={`bg-gray-50 pb-5 ${hasErrors(form, ["CreatorWorkEmail", "CreatorWorkURL"]) ? 
            "font-bold text-red-600" : ""}`}>Image creator fields</summary>
              <div className="flex gap-2">
              <FormSection fieldConfig={fields.CreatorWorkEmail}  form={form}
            editmetadata={editmetadata}
            metaData={metaData} />
              <FormSection fieldConfig={fields.CreatorWorkURL}  form={form}
            editmetadata={editmetadata}
            metaData={metaData} />
               </div>
            </details>
         
         
          <div>
            
            {formStatusHelper()}

          </div>
        </form>
      </Form>
      </div>
    </div>
    </>
  );
}


const FormSection = ({ fieldConfig, className, form, editmetadata, metaData }) => {
    const fixedDate = metaData?.DateCreated
      ? metaData.DateCreated.replace(
          /^(\d{4}):(\d{2}):(\d{2})/,
          "$1-$2-$3"
        ).replace(" ", "T")
      : null;

    const disabled = editmetadata.isPending || editmetadata.isSuccess;
    const fieldError = form.formState.errors[fieldConfig.name];

    const formType = (field) => {
      switch (fieldConfig.type) {
        case "textarea":
          return (
            <Textarea
              placeholder={fieldConfig.placeholder}
              {...field}
              disabled={disabled}
              className="bg-gray-200 text-wrap shadow-md"
            />
          );

        case "input":
          return (
            <Input
              placeholder={fieldConfig.placeholder}
              {...field}
              disabled={disabled}
                
              
              className="bg-gray-200 shadow-md"
            />
          );

        case "datepicker":
          return (
            <DatePicker
              props={{ ...field }}
              disabled={disabled}
              placeholder={fieldConfig.placeholder}
              imageDate={fixedDate}
            />
          );

        case "email":
          return (
            <Input
              {...field}
              type="email"
              disabled={disabled}
                          onChange={(e) => {
                field.onChange(e);           // keeps RHF updated
                form.clearErrors(field.name); // clears error for this field
              }}
              placeholder={fieldConfig.placeholder}
            />
          );

        default:
          return (
            <Input
              placeholder={fieldConfig.placeholder}
              disabled={disabled}
              onChange={(e) => {
                    field.onChange(e);           // keeps RHF updated
                    form.clearErrors(field.name); // clears error for this field
                  }}
              {...field}
              className="bg-gray-200 shadow-md"
            />
          );
      }
    };

    return (
      <FormField
        control={form.control}
        name={fieldConfig.name}
        render={({ field }) => (
          <FormItem className={className}>
            <FormLabel
              className={`dark:text-white ${fieldError ? "font-bold" : ""}`}
            >
              {fieldConfig.label}
            </FormLabel>
            <FormDescription>{fieldConfig.description}</FormDescription>
            <FormControl>{formType(field)}</FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    );
  };