import React from 'react'
import { Line } from "react-chartjs-2"
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Interaction } from "chart.js"
import { response } from 'express'

ChartJs.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
)



export const options = {
    responsive: true,
    interaction: {
        mode: "index",
        intersect: false,
    },
    stacked:
        false,
    plugins: {
        title: {
            display: true,
            text: "Sales & Order Data"
        },
    },
    scales: {
        y: {
            type: "Linear", display: true,
            position: "left"
        },
        y1: {
            type: "Linear",
            display: true,
            position:
                "right",
            grid: { drawOnChartArea: false, }
        }
    }
}


const labels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
]
const lineChartData = {
    labels,

    datasets: [
        {
            label: "Steps",
            data: [3000, 5000, 4500, 6000, 8000, 7000, 90001],
            borderColor: "rgb(75, 192, 192)"
        }
    ]
}
export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: [12, 45, 68, 45, 23],
            borderColor: "rgb(255,44,99,132) ",
            backgroundColor: "rgba (255, 99, 132, 0.5)",
            yAxisID: "y",
        },
        {
            label: "Dataset 2",
            data: [12, 5, 9, 45, 78, 4],
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            yAxisID: "y1",
        }]
}
function SalesChart() {

    return (

        <Line options={options} data={data} />

    )
}



export default SalesChart
