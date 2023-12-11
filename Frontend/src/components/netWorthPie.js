import React, { useEffect } from "react"
import { useGetTransactions } from "../hooks/useGetTransactions"
import * as d3 from 'd3'
import { useGetBudgets } from "../hooks/useGetBudgets"

const NetPie = () => {
    const { transactions } = useGetTransactions()
    const { budgets } = useGetBudgets()
    const netData = []

    let z = 0

    budgets.forEach((budget) => {
        let y = 0
        transactions.forEach((transaction) => {
            if(transaction.budget === "Income"){
                y = y + parseInt(transaction.amount)
            }
            else {
                z = z + parseInt(transaction.amount)
            }
        })
        if (budget.description === "Income"){
            if(y !== 0){
              netData.push({label: budget.description, value: y})
            }
        }
    })
    if(z !== 0){
      netData.push({label: "Expenses", value: z})
    }

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
        .domain([0, netData.length]);
    
      useEffect(() => {
        drawChart();
      }, [netData]);
    
      function drawChart() {
        // Remove the old svg
        d3.select('#netPie')
          .select('svg')
          .remove();
    
        // Create new svg
        const svg = d3
          .select('#netPie')
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
          .data(pieGenerator(netData))
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
            <div id="netPie" />
        </div>
    )
}

export default NetPie