import React from 'react';
import Chart from 'react-apexcharts';

export default function CardChart({ title, totalValue, chartData, bigger }) {

    if (bigger == "1") {
        return (
            <div className="flex flex-col space-y-1 p-4 rounded-xl bg-[#1b2537] animate-fade-up">
                <p className="text-white text-2xl font-bold">{title}</p>
                <Chart className="w-56 h-48"
                    options={{
                        ...chartData.options,
                        colors: ['#4B4AEF', '#FFCA1D', '#3ADAD9', '#5B59FF', '#FFD93D', '#55E5E4'],
                        legend: {
                            show: false,
                        },
                        stroke: {
                            show: false,
                        },
                        dataLabels: {
                            enabled: false,
                        },

                    }}
                    series={chartData.series}
                    type="donut"

                    width="100%"
                    height="100%"
                />
            </div >
        );
    }
    else if (!chartData) {
        return (
            <div className="w-full flex justify-between p-4 rounded-xl bg-[#1b2537] animate-fade-up">
                <div className="flex w-full flex-col items-center justify-around pb-4">
                    <p className="text-white text-xl font-bold">{title}</p>
                    <p className="text-primary text-3xl font-bold">{totalValue}</p>
                </div>

            </div >
        );
    }
    else {
        return (
            <div className="w-full flex justify-between p-4 rounded-xl bg-[#1b2537] animate-fade-up">
                <div className="flex flex-col justify-around pb-4">
                    <p className="text-white text-xl font-bold">{title}</p>
                    <p className="text-primary text-lg font-bold">{totalValue}</p>
                </div>
                <div className="flex">
                    <Chart className="w-36 h-36"
                        options={{
                            ...chartData.options,
                            colors: ['#4B4AEF', '#FFCA1D', '#3ADAD9', '#5B59FF', '#FFD93D', '#55E5E4'],
                            legend: {
                                show: false,
                            },
                            stroke: {
                                show: false,
                            },
                            dataLabels: {
                                enabled: false,
                            },

                        }}
                        series={chartData.series}
                        type="donut"

                        width="100%"
                        height="100%"
                    />
                </div>
            </div >
        );
    }
}
