import useDimension from '@/hooks/useWindowDimension'
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
   const { windowDimension, md, lg, xl, xxl } = useDimension()
   if (!windowDimension) return null

   return (
      <>
         <div className="relative">
            <h3 className="text-3xl xl:text-2xl 2xl:text-3xl text-secundary_blue-main font-semibold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
               64%
            </h3>
            <div className="relative w-[151px] h-[151px] 2xl:w-[161px] 2xl:h-[161px] xl:w-[151px] xl:h-[151px]">
               <div className="absolute w-[151px] h-[151px] rounded-full chart-box-shadow fade-in 2xl:w-[161px] 2xl:h-[161px] lg:w-[151px] lg:h-[151px]" />
               <ResponsiveContainer>
                  <PieChart>
                     <Pie
                        cx="50%"
                        data={data}
                        dataKey="value"
                        innerRadius={windowDimension <= 1440 ? 45 : 50}
                        outerRadius={windowDimension <= 1440 ? 75 : 80}
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
