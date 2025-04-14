"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Paragraph from "./Paragraph";
import Label from "./Label";
import { TbSearch } from "react-icons/tb";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (query.length > 2) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `/api/searchEmlekadatlapok?query=${query}`
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`); // Capture HTTP errors
          }
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error("Failed to fetch search results:", error);
          setResults([]); // Clear results if there's an error
        }
      };
      fetchData();
    } else {
      setResults([]); // Clear results if query is less than 3 chars
    }
  }, [query]);

  useEffect(() => {
    setQuery("");
    setResults([]);
  }, [pathname]);

  return (
    <div className="relative w-full self-stretch">
      <TbSearch className="absolute top-1/2 -translate-y-1/2 xl:left-6 left-2 w-6 h-6 text-[--blue]" />
      <input
        type="text"
        className="w-full xl:h-[70px] xl:pr-6 pr-4 xl:pl-16 pl-10 py-2 xl:border-x xl:outline-none outline outline-1 xl:rounded-none rounded-full outline-gray-300 border-gray-300 focus:outline-none focus:bg-[--cream]"
        placeholder="Keress névre, évszámra bármire..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
      />
      {isFocused && (
        <div className="absolute w-full -mt-[1px] bg-white border rounded-b-2xl border-gray-200 overflow-hidden shadow-lg z-10">
          {results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={result._id} className="px-4 py-2 hover:bg-gray-100">
                  <Link
                    href={`/emlekadatlapok/${result.uri}`}
                    className="flex flex-nowrap items-center gap-2"
                  >
                    <div className="relative min-w-10 min-h-10 rounded-full overflow-hidden">
                      <Image
                        src={result.profileimage}
                        fill
                        style={{ objectFit: "cover" }}
                        alt="profile"
                      />
                    </div>
                    <Paragraph>
                      <Paragraph classname={"font-semibold"}>
                        {result.name}
                      </Paragraph>{" "}
                      {result.born} - {result.died}
                    </Paragraph>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            query.length > 2 && (
              <div className="px-4 py-2 text-gray-500">Nincs találat.</div>
            )
          )}
        </div>
      )}
    </div>
  );
}
