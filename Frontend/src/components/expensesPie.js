import React, { useEffect } from "react"
import { useGetTransactions } from "../hooks/useGetTransactions"
// import * as d3 from 'd3'
import * as d3 from 'd3'
import { useGetBudgets } from "../hooks/useGetBudgets"

const ExpensesPie = () => {
    const { transactions } = useGetTransactions()
    const { budgets } = useGetBudgets()
    const data = []

    budgets.forEach((budget) => {
      let z = 0
      transactions.forEach((transaction) => {
        if(transaction.budget !== "Income" && transaction.budget === budget.description){
          z = z + parseInt(transaction.amount)
        }
      })
      if (z !== 0){
        data.push({label: budget.description, value: z})
      }
      z = 0
    })

    const outerRadius = 200
    const innerRadius = 0
      const margin = {
        top: 50, right: 50, bottom: 50, left: 50,
      };
    
      const width = 2 * outerRadius + margin.left + margin.right;
      const height = 2 * outerRadius + margin.top + margin.bottom;
    
      const colorScale = d3     
        .scaleSequential()      
        .interpolator(d3.interpolateCool)      
        .domain([0, data.length]);
    
      useEffect(() => {
        drawChart();
      }, [data]);
    
      function drawChart() {
        // Remove the old svg
        d3.select('#transactionsPie')
          .select('svg')
          .remove();
    
        // Create new svg
        const svg = d3
          .select('#transactionsPie')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
        const arcGenerator = d3
          .arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);
    
        const pieGenerator = d3
          .pie()
          .padAngle(0)
          .value((d) => d.value);
    
        const arc = svg
          .selectAll()
          .data(pieGenerator(data))
          .enter();
    
        // Append arcs
        arc
          .append('path')
          .attr('d', arcGenerator)
          .style('fill', (_, i) => colorScale(i))
          .style('stroke', '#ffffff')
          .style('stroke-width', 0);
    
        // Append text labels
        arc
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('alignment-baseline', 'middle')
          .text((d) => d.data.label)
          .attr('transform', (d) => {
            const [x, y] = arcGenerator.centroid(d);
            return `translate(${x}, ${y})`;
          });
      }    
    

    return (
        <div>
            <div id="transactionsPie" />
        </div>
    )
}

export default ExpensesPie