import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export function CheckboxBasic({ children }) {
    return (
        <FieldGroup className="mx-auto w-56">
            <Field orientation="horizontal">
                <Checkbox id={children} name="terms-checkbox-basic" />
                <FieldLabel htmlFor={children}>
                    {children}
                </FieldLabel>
            </Field>
        </FieldGroup>
    )
}
