"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Paragraph from "./Paragraph";
import Label from "./Label";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
        const fetchData = async () => {
            try {
              const response = await fetch(`/api/searchEmlekadatlapok?query=${query}`);
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

  return (
    <div className="relative w-full max-w-md self-center">
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-full"
        placeholder="Keress névre, évszámra bármire..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
      />
      {isFocused && results.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg">
          <ul>
            {results.map((result) => (
              <li key={result._id} className="px-4 py-2 hover:bg-gray-100 ">
                <Link href={`/emlekadatlapok/${result.uri}`} className="flex flex-nowrap items-center gap-2">
                    <div className="relative min-w-10 min-h-10 rounded-full overflow-hidden">
                        <Image src={result.profileimage} fill style={{ objectFit: "cover" }}/>
                    </div>
                    <Paragraph ><Paragraph classname={"font-semibold"}>{result.name}</Paragraph> {result.born} - {result.died}</Paragraph>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
