import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Particular", value: 100 },
];

const COLORS = ["#93C5FD"];

export const InsurancePieChart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#93C5FD"
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center -mt-32 mb-16">
        <div className="text-3xl font-semibold text-muted-foreground">4</div>
        <div className="text-xs text-muted-foreground">Pacientes</div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <div className="w-3 h-3 rounded-full bg-[#93C5FD]"></div>
        <span className="text-xs text-muted-foreground">Particular</span>
      </div>
    </div>
  );
};
