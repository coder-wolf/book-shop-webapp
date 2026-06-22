import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { IoSearch } from "react-icons/io5";

export function SearchJoined() {
    return (
        <Field>
            <ButtonGroup>
                <Input className="w-80" id="input-button-group" placeholder="Type to search..." />
                <Button variant="outline"><IoSearch /></Button>
            </ButtonGroup>
        </Field>
    )
}
