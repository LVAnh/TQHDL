import * as d3 from 'd3'
import BarChart from "../components/bar-chart";
import PieChart from "../components/pie-chart";
import HorizontalBarChart from "../components/horzontal-bar-chart";

const Chart = ({data, type}) => {
    switch (type) {
        case 1:
            return (
                <BarChart
                    data={data}
                    x={d => d.category_name}
                    y={d => d.sales}
                    xDomain={d3.groupSort(data, ([d]) => -d.sales, d => d.category_name)}
                    yLabel={"↑ Doanh số"}
                    width={window.width}
                    height={window.height}
                    color={"steelblue"}
                />
            )
        case 2:
            return (
                <HorizontalBarChart
                    data={data}
                    y={d => d.name}
                    x={d => d.inventory}
                    yDomain={d3.groupSort(data, ([d]) => -d.inventory, d => d.name)}
                    xFormat={"%"}
                    xLabel={"Tỉ lệ tồn kho →"}
                    width={window.width}
                    height={window.height}
                    color={"steelblue"}
                />

            )
        case 3:
        case 4:
            return (
                <PieChart
                    data={data}
                    name={d => d.name}
                    value={d => d.value}
                    width={window.width}
                    height={window.height}
                />
            )
        default:
            return (<div/>)
    }
}
export default Chart;
