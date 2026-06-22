import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

export function SearchJoined() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const urlQuery = searchParams.get('search') || '';
    const [query, setQuery] = useState(urlQuery);
    const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);

    if (urlQuery !== prevUrlQuery) {
        setQuery(urlQuery);
        setPrevUrlQuery(urlQuery);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/?search=${encodeURIComponent(query.trim())}`);
        } else {
            navigate('/');
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <Field>
                <ButtonGroup>
                    <Input 
                        className="w-80 border-border bg-background focus:border-[#6C5DD4]" 
                        id="input-button-group" 
                        placeholder="Search books by title, author..." 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button type="submit" variant="outline" className="hover:bg-[#6C5DD4] hover:text-white cursor-pointer"><IoSearch /></Button>
                </ButtonGroup>
            </Field>
        </form>
    )
}
