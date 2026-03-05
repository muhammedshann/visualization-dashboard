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
        // Ensure field name matches your JSON keys (e.g., 'topics' vs 'topic')
        return [...new Set(data.map((item) => item[field]).filter(Boolean))].sort();
    };

    // Full list of 9+ filters required by your assignment
    const filterConfigs = [
        { key: "end_year", label: "End Year", options: getUnique("end_year") },
        { key: "topics", label: "Topics", options: getUnique("topics") },
        { key: "sector", label: "Sector", options: getUnique("sector") },
        { key: "region", label: "Region", options: getUnique("region") },
        { key: "pest", label: "PEST", options: getUnique("pest") },
        { key: "source", label: "Source", options: getUnique("source") },
        { key: "swot", label: "SWOT", options: getUnique("swot") },
        { key: "country", label: "Country", options: getUnique("country") },
        { key: "city", label: "City", options: getUnique("city") },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filterConfigs.map((config) => (
                    <div key={config.key} className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">
                            {config.key.replace("_", " ")}
                        </label>
                        <select
                            value={localFilters[config.key] || ""}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                            onChange={(e) => update(config.key, e.target.value)}
                        >
                            <option value="">All {config.label}s</option>
                            {config.options.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-slate-50">
                <button onClick={clear} className="text-slate-500 hover:text-slate-800 font-medium text-sm px-6 py-2">
                    Reset All
                </button>
                <button onClick={apply} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-10 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
                    Apply Selection
                </button>
            </div>
        </div>
    );
}

export default Filters;