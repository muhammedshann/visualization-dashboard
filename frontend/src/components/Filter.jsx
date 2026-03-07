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
        // Filters out empty/null values and sorts for a clean UI
        return [...new Set(data.map((item) => item[field]).filter(Boolean))].sort();
    };

    // --- Added all requested filters here ---
    const filterConfigs = [
        { key: "end_year", label: "End Year", options: getUnique("end_year") },
        { key: "topics", label: "Topic", options: getUnique("topics") }, // Match JSON 'topics'
        { key: "sector", label: "Sector", options: getUnique("sector") },
        { key: "region", label: "Region", options: getUnique("region") },
        { key: "pest", label: "PEST", options: getUnique("pest") },     // Match JSON 'pest'
        { key: "source", label: "Source", options: getUnique("source") },
        { key: "swot", label: "SWOT", options: getUnique("swot") },
        { key: "country", label: "Country", options: getUnique("country") },
        { key: "city", label: "City", options: getUnique("city") },
    ];

    return (
        <div className="flex flex-wrap items-end gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            {filterConfigs.map((config) => (
                <div key={config.key} className="flex-1 min-w-[180px]">
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5 ml-1 tracking-widest">
                        {config.key.replace("_", " ")}
                    </label>
                    <div className="relative">
                        <select
                            value={localFilters[config.key] || ""}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block p-2.5 transition-all outline-none cursor-pointer hover:bg-white appearance-none"
                            onChange={(e) => update(config.key, e.target.value)}
                        >
                            <option value="">{`All ${config.label}s`}</option>
                            {config.options.map((opt, i) => (
                                <option key={i} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                           <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                           </svg>
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex items-center gap-3 ml-auto pt-4 w-full md:w-auto">
                <button
                    onClick={clear}
                    className="flex-1 md:flex-none text-slate-500 hover:text-slate-800 font-medium text-sm px-6 py-2.5 transition-colors border border-transparent hover:border-slate-200 rounded-xl"
                >
                    Reset
                </button>
                <button
                    onClick={apply}
                    className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-2.5 px-10 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Apply Filters
                </button>
            </div>
        </div>
    );
}

export default Filters;