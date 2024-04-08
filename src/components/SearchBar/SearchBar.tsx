import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchBarProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  className?: string;
}

function SearchBar({ value, onChange, onSubmit, className }: SearchBarProps) {
  return (
    <search className={`w-full ${className}`}>
      <form className="flex w-full" onSubmit={onSubmit}>
        <input
          className="mr-4 flex-1 rounded-xl border-0 px-4 text-gray-900 opacity-50 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600"
          type="text"
          name="search-value"
          placeholder="Search for a city or country"
          value={value}
          onChange={onChange}
        />
        <button
          className="h-[42px] w-[42px] flex-none rounded-xl border-0 bg-[#4CA1AF] transition-transform hover:scale-105 active:scale-95"
          type="submit"
        >
          <MagnifyingGlassIcon className="m-auto h-6 w-6 stroke-white stroke-2" />
        </button>
      </form>
    </search>
  );
}

export default SearchBar;
