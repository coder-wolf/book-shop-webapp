import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function Search() {
    return (
        <Field orientation="horizontal">
            <Input className="font-normal rounded-md px-4 py-4" type="search" placeholder="Search..." />
            <Button className="bg-amber-300 text-black font-normal rounded-md px-4 py-4">Search</Button>
        </Field>
    )
}