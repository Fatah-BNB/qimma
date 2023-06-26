import React from 'react';
import Chart from 'react-apexcharts';

export default function CardGraph({ title, totalValue, chartData, chartType }) {
    const getChartType = () => {
        if (chartType === 'column') {
            return 'bar';
        } else {
            return 'area';
        }
        return 'area';
    };
    chartData.options.colors = ['#4B4AEF'];
    return (
        <div className="flex w-full flex-col justify-between space-x-4 p-4 rounded-xl bg-[#1b2537] animate-fade-up">
            <div className="flex flex-col">
                <p className="text-white text-xl font-bold">{title}</p>
                <p className="text-primary text-lg font-bold my-auto">{totalValue}</p>
            </div>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type={getChartType()}
                width="100%"
                height="100%"
            />
        </div>
    );
}
