
import { BarChart, CartesianGrid, XAxis,  YAxis, Bar,} from 'recharts';
import { ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartContainer  } from "../../../components/ui/chart"

export function DataTypeChart({ data }) {
  const isValidData = data && typeof data === 'object' && !Array.isArray(data);

  if (!isValidData) {
    return <div className="text-gray-500">No data available</div>;
  }

  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  const chartConfig = {
  name : {
    label: "Metadata",
    color: "var(--chart-1)",
  },
  value: {
     label: "Amount",
     color: "var(--chart-2)",
  }
 } 


//  f/* unction CustomLegend({ data }) {
//     return (
//       <div className="flex justify-center gap-2 mt-2 text-xs w-40 flex-wrap">
//         {data.map((item, index) => (
//           <div key={item.name} className="flex items-center gap-1">
//               <span>{item.name}: {item.value}</span>
//           </div>
//         ))}
//       </div>
//     );
//   } */

  return (
    <>
    <ChartContainer config={chartConfig} className="h-[200px] max-w-64 pb-5">
  <BarChart accessibilityLayer data={chartData}>
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="name"
      tickLine={true}
      tickMargin={2}
      axisLine={true}
      tickFormatter={(val) => String(val).slice(0, 3)}
    />
    <YAxis
          tickLine={true}
          axisLine={true}
          tickMargin={0}
          tickFormatter={(value) => `${value}`} // You can customize this format
          width={19}
        />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    
    <Bar dataKey="value" fill="var(--color-name)" radius={4} />
  </BarChart>
  
  </ChartContainer>
 
  
  </>

  );
}