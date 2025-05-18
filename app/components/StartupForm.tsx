"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { createPitch } from "@/lib/actions";
import { PrevState } from "../types";


const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState('');
    const handleFormSubmit = async (prevState: PrevState, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                link: formData.get('link') as string,
                pitch: pitch,
            };
            await formSchema.parseAsync(formValues);
            const result = await createPitch(prevState, formData, pitch);
            if(result.status === "SUCCESS") {
                alert("pitch submitted successfully");
                return result;
            }
            return {...prevState, error: "something went wrong", status: "ERROR"}
        } catch (error) {
            const zodError = error as z.ZodError;
            if (zodError) {
                const fieldErrors = zodError.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>);
                return { ...prevState, error: "validation failed", status: "ERROR" }
            } else {
                return { ...prevState, error: "something went wrong", status: "ERROR" }
            }
        } 
    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit,{
        error: "",
        status: "INITIAL"
    });

    console.log(state);
    
    return (
       <form action={formAction} className="startup-form">
          <div>
            <label htmlFor="title" className="startup-form_label">Title</label>
            <Input id="title" name="title" type="text" className="startup-form_input" required placeholder="Startup Name"/>
             {errors.title && <p className="startup-form_error">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="description" className="startup-form_label">Description</label>
            <Textarea id="description" name="description"  className="startup-form_textarea" required placeholder="Startup Description"/>
             {errors.desciption && <p className="startup-form_error">{errors.desciption}</p>}
          </div>

          <div>
            <label htmlFor="category" className="startup-form_label">Category</label>
            <Input id="category" name="category"  className="startup-form_input" required placeholder="Startup Category"/>
             {errors.category && <p className="startup-form_error">{errors.category}</p>}
          </div>

          <div>
            <label htmlFor="link" className="startup-form_label">Link</label>
            <Input id="link" name="link" className="startup-form_input" required placeholder="Startup Image Link"/>
             {errors.link && <p className="startup-form_error">{errors.link}</p>}
          </div>

          <div data-color-mode="light">
            <label htmlFor="pitch" className="startup-form_label">Pitch</label>
            <MDEditor 
                value = {pitch} 
                onChange={(value) => setPitch(value as string)} 
                id="pitch" 
                preview="edit" 
                height={300} 
                style={{borderRadius: 20, overflow: 'hidden'}}
                textareaProps={{
                    placeholder: 'Breifly describe your startup and your idea',
                }}
                previewOptions={{
                   disallowedElements: ['style'],
                }}
            />
             {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
          </div>

          <button type="submit" className="startup-form_btn text-white flex justify-center gap-4" disabled={isPending}>
             {isPending ? 'Pitching...' : 'Pitch Startup'}
             <Send className="size-6 ml-2"/>
          </button>
       </form>
    )
}

export default StartupForm;