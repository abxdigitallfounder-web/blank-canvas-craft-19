import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";

const data = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  let value = 0;
  if (day === 24) value = 1;
  if (day === 28) value = 1;
  return { day, value };
});

export const AppointmentsLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="0" stroke="#F3F4F6" vertical={false} />
        <XAxis 
          dataKey="day" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
          interval={2}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
          domain={[0, 1]}
          ticks={[0, 0.25, 0.5, 0.75, 1]}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#3B82F6" 
          strokeWidth={2}
          dot={{ fill: '#3B82F6', r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
