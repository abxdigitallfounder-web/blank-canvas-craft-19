import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { age: 0, value: 0 },
  { age: 5, value: 0 },
  { age: 10, value: 1 },
  { age: 15, value: 0 },
  { age: 20, value: 0 },
  { age: 25, value: 0 },
  { age: 30, value: 0 },
  { age: 35, value: 0 },
  { age: 40, value: 0 },
];

export const AgeDistributionChart = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="0" stroke="#F3F4F6" vertical={false} />
        <XAxis 
          dataKey="age" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
          domain={[0, 1]}
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
