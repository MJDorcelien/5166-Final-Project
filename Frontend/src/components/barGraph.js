// import { axisBottom, scaleBand, select } from "d3"
// import { useGetBudgets } from "../hooks/useGetBudgets"
// import { useGetTransactions } from "../hooks/useGetTransactions"
// import { useEffect, useRef } from "react"
// import * as d3 from "d3"
// import c3 from "c3"
// import React from "react"
// import { useGetBudgetTransactions } from "../hooks/useGetBudgetTransactions"

// const BarGraph = () => {

//     const { transactions } = useGetTransactions()
//     const { budgets } = useGetBudgets()
//     const data = []

//     budgets.forEach((budget) => {
//       let z = 0
//       transactions.forEach((transaction) => {
//         if(transaction.budget !== "Income" && transaction.budget === budget.description){
//           z = z + parseInt(transaction.amount)
//         }
//       })
//       if (z !== 0){
//         data.push({label: budget.description, value: z})
//       }
//       z = 0
//     })

//     // console.log("barchart ", data)

//     const { transBudgets } = useGetBudgetTransactions()
//     const expected = ['expected']
//     const estimatedData = []
//     const actual = ['actual']

//     transBudgets.forEach((budget) => {
//         // expected.push(budget.estimated)
//         // console.log(budget.expected)
//         // actual.push(budget.actual)
//         // let remaining = 0
//         const { title, estimated, actual } = budget
//         estimatedData.push(estimated)
//     })

//     console.log(transBudgets)
//     console.log(estimatedData)

//     console.log( expected)
    
//     React.useEffect(() => {
//         c3.generate({
//             bindto: '#bargraph',
//             data: {
//                 columns: [
//                     ['data1', 30, 200, 100, 400, 150, 250],
//                     ['data2', 50, 20, 10, 40, 15, 25],
//                     expected,
//                     actual,
//                 ],
//                 type: 'bar',
//             }
//         })
//     }, [])

//     return (
//         <div>
//             <h1>from bar graph</h1>
//             <div id="bargraph"/>
//         </div>
//     )
// }

// export default BarGraph