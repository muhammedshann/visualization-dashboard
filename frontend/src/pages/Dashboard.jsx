import { useEffect, useState } from "react";
import { fetchInsights } from "../api/api";

import IntensityChart from "../components/IntensityChart";
import LikelihoodChart from "../components/LikelihoodChart";
import TopicChart from "../components/TopicChart";
import RegionChart from "../components/RegionChart";
import YearChart from "../components/YearChart";
import Filters from "../components/filters";

function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({});
    const [originalData, setOriginalData] = useState([]);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetchInsights(filters);
            setData(res.data);
            if (originalData.length === 0) {
                setOriginalData(res.data);
            }
        } catch (error) {
            console.error("Error fetching insights:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [filters]);

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-4 md:p-8">
            {/* Header Section */}
            <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-800">
                        Global Insights
                    </h1>
                    <p className="text-slate-500 mt-1">Real-time data visualization & analysis</p>
                </div>

                <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                    <Filters data={originalData} setFilters={setFilters} />
                </div>
            </header>

            <main className="max-w-7xl mx-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">

                        {/* Intensity & Likelihood - Main Stats */}
                        <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Intensity Trends</h3>
                            <IntensityChart data={data} />
                        </div>

                        <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Likelihood Analysis</h3>
                            <LikelihoodChart data={data} />
                        </div>

                        {/* Topics & Regions - Secondary Breakdowns */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Top Topics</h3>
                            <TopicChart data={data} />
                        </div>

                        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Regional Distribution</h3>
                            <RegionChart data={data} />
                        </div>

                        {/* Year Chart - Full Width Footer Chart */}
                        <div className="lg:col-span-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Yearly Projection</h3>
                            <YearChart data={data} />
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
}

export default Dashboard;