import React from "react"
import Chart from "chart.js/auto"
import { useGetTransactions } from "../hooks/useGetTransaction"

const PieChart = () => {
    // switch to using d3
    
    let mypieChart

    const data = {
        labels: ["hi","hello","hiya"],
        datasets: [
            {
                data: [20,35,70],
                backgroundColor: [
                    '#ffcd56',
                    '#ff6384',
                    '#36a2eb',
                    '#fd6b19',
                    '#AEE5D8',
                    'pink',
                    '#386641',
                    '#361134'
                ],
            },
        ],
    }

    const createChart = async () => {
        if (mypieChart) mypieChart.destroy();
        mypieChart = new Chart("mypieChart", {
            type: 'pie',
            data: data
        });
        // var ctx = document.getElementById("myChart").getContext('2d')
        // new Chart(ctx, {
        //     type: 'pie',
        //     data: data
        // })
    }

    const { transactions } = useGetTransactions()

    const getTransactions = async () => {
        transactions.map((transaction, i) => {
            data.labels[i] = transaction.description
            data.datasets[0].data[i] = transaction.amount
        })

        await createChart()
    }

    getTransactions()

    return (
        <canvas id="mypieChart" width="400" height="400">{mypieChart}</canvas>

        // <canvas id="myChart" width="400" height="400"></canvas>
    )
}

export default PieChart