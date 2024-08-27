import React from "react";
import { Search } from "lucide-react";

type PageFilterProps = {} & React.ComponentProps<"input">;

export const PageFilter = ({ className, ...props }: PageFilterProps) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder="Search Linked Articles"
        className="w-full px-3 py-2 pl-10 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        {...props}
      />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
  );
};
