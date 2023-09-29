import { Pie, PieChart, ResponsiveContainer } from 'recharts'

const data = [
   {
      name: 'Group A',
      value: 200,
      fill: '#0BD2E2'
   },
   {
      name: 'Group B',
      value: 100,
      fill: '#FA9963'
   }
]

export default function PieChartComponent() {
   return (
      <>
         <div className="relative">
            <h3 className="text-3xl text-secundary_blue-main font-semibold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
               64%
            </h3>
            <div className="relative w-[161px] h-[161px]">
               <div className="absolute w-[161px] h-[161px] rounded-full chart-box-shadow fade-in" />
               <ResponsiveContainer width={161} height={161}>
                  <PieChart>
                     <Pie
                        cx="50%"
                        data={data}
                        dataKey="value"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        startAngle={90}
                        endAngle={-270}
                        stroke="none"
                     />
                  </PieChart>
               </ResponsiveContainer>
            </div>
         </div>
      </>
   )
}
