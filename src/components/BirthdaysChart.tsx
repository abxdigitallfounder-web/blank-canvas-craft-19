import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";

const data = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  let value = 0;
  if (day === 15) value = 1;
  return { day, value };
});

export const BirthdaysChart = () => {
  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={200}>
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
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Nenhum aniversariante hoje.</p>
      </div>
    </div>
  );
};
