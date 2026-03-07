import { useState } from "react";

function Filters({ data, setFilters }) {
    const [localFilters, setLocalFilters] = useState({});

    const update = (key, value) => {
        const newFilters = { ...localFilters };
        if (value === "") {
            delete newFilters[key];
        } else {
            newFilters[key] = value;
        }
        setLocalFilters(newFilters);
    };

    const apply = () => {
        setFilters(localFilters);
    };

    const clear = () => {
        setLocalFilters({});
        setFilters({});
    };

    const getUnique = (field) => {
        return [...new Set(data.map((item) => item[field]).filter(Boolean))].sort();
    };

    const filterConfigs = [
        { key: "end_year", label: "End Year", options: getUnique("end_year") },
        { key: "topics", label: "Topic", options: getUnique("topics") },
        { key: "sector", label: "Sector", options: getUnique("sector") },
        { key: "region", label: "Region", options: getUnique("region") },
        { key: "pest", label: "PEST", options: getUnique("pest") },
        { key: "source", label: "Source", options: getUnique("source") },
        { key: "swot", label: "SWOT", options: getUnique("swot") },
        { key: "country", label: "Country", options: getUnique("country") },
        { key: "city", label: "City", options: getUnique("city") },
    ];

    return (
        // Reduced overall padding (p-3) and gap (gap-2.5)
        <div className="flex flex-wrap items-end gap-2.5 p-3 bg-white rounded-xl shadow-sm border border-slate-100">
            {filterConfigs.map((config) => (
                // Shrunk min-w from 180px to 130px so more fit on a single row
                <div key={config.key} className="flex-1 min-w-[130px]">
                    <label className="block text-[9px] uppercase font-bold text-slate-400 mb-1 ml-0.5 tracking-wider">
                        {config.key.replace("_", " ")}
                    </label>
                    <div className="relative">
                        <select
                            value={localFilters[config.key] || ""}
                            // Switched to text-xs, py-1.5, and px-2.5 for a much tighter input
                            className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block py-1.5 px-2.5 transition-all outline-none cursor-pointer hover:bg-white appearance-none"
                            onChange={(e) => update(config.key, e.target.value)}
                        >
                            <option value="">{`All ${config.label}s`}</option>
                            {config.options.map((opt, i) => (
                                <option key={i} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
                           {/* Shrunk the dropdown arrow icon */}
                           <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                           </svg>
                        </div>
                    </div>
                </div>
            ))}

            {/* Tightened the button container */}
            <div className="flex items-center gap-2 ml-auto mt-1 w-full md:w-auto md:mt-0">
                <button
                    onClick={clear}
                    // Smaller text and padding for the reset button
                    className="flex-1 md:flex-none text-slate-500 hover:text-slate-800 font-medium text-xs px-4 py-1.5 transition-colors border border-transparent hover:border-slate-200 rounded-lg"
                >
                    Reset
                </button>
                <button
                    onClick={apply}
                    // Smaller text, padding, and icon for the apply button
                    className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium py-1.5 px-5 rounded-lg shadow-sm shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 text-xs"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Apply
                </button>
            </div>
        </div>
    );
}

export default Filters;