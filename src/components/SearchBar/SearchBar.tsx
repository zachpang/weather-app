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
        <div className="bg-white-alpha-50 mr-4 h-10 flex-1 rounded-xl border-0">
          <input
            className=" box text-primary placeholder:text-secondary w-full rounded-xl border-0 bg-transparent px-4 focus:ring-2 focus:ring-inset focus:ring-gray-600"
            type="text"
            name="search-value"
            placeholder="Search for a city or country"
            value={value}
            onChange={onChange}
          />
        </div>
        <button
          className="bg-theme-color h-10 w-10 flex-none rounded-xl border-0 transition-transform hover:scale-105 active:scale-95"
          type="submit"
        >
          <MagnifyingGlassIcon className="m-auto h-6 w-6 stroke-white stroke-2" />
        </button>
      </form>
    </search>
  );
}

export default SearchBar;
