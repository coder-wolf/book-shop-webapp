import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export function CheckboxBasic({ children, checked, onCheckedChange, ...props }) {
    return (
        <FieldGroup className="mx-auto w-56">
            <Field orientation="horizontal">
                <Checkbox 
                    id={children} 
                    name="terms-checkbox-basic" 
                    checked={checked}
                    onCheckedChange={onCheckedChange}
                    {...props}
                />
                <FieldLabel htmlFor={children} className="cursor-pointer select-none">
                    {children}
                </FieldLabel>
            </Field>
        </FieldGroup>
    )
}
