import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Particular", value: 100 },
  { name: "Convênio", value: 0 },
];

const COLORS = ["#93C5FD", "#E5E7EB"];

export const AppointmentDurationChart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="text-4xl font-semibold text-muted-foreground">24min</div>
      </div>
      
      <div className="w-full px-4">
        <div className="text-xs text-muted-foreground mb-3">Tipo de atendimento</div>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={data} layout="horizontal">
            <XAxis type="category" dataKey="name" hide />
            <YAxis type="number" hide domain={[0, 100]} />
            <Bar dataKey="value" radius={[4, 4, 4, 4]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <div className="flex items-center gap-1">
            <span>Particular</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Convênio</span>
          </div>
        </div>
        <div className="flex justify-between text-xs font-medium mt-1">
          <span>100%</span>
          <span className="text-muted-foreground">-</span>
        </div>
      </div>
    </div>
  );
};
