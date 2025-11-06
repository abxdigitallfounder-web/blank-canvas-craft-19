import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Retorno", value: 100 },
];

const COLORS = ["#FB923C"];

export const ProceduresPieChart = () => {
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
            fill="#FB923C"
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
        <div className="text-3xl font-semibold text-muted-foreground">7</div>
        <div className="text-xs text-muted-foreground">Procedimentos</div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <div className="w-3 h-3 rounded-full bg-[#FB923C]"></div>
        <span className="text-xs text-muted-foreground">Retorno</span>
      </div>
    </div>
  );
};
