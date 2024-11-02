import { stats } from "../utils/constants";

export const ExperienceSummary: React.FC = () => {
  return (
    <section className="w-full md:max-w-screen-lg px-4 mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-0 justify-around text-white">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="text-center bg-cardBG border-[1px] border-textGray/20 w-full md:w-56 h-56 justify-center flex flex-col items-center rounded-2xl relative overflow-hidden"
        >
          <h4 className="text-4xl font-bold uppercase">{stat.count}</h4>
          <div className="absolute h-24 w-24 blur-3xl -top-12 rounded-full bg-blueGlow"></div>
          <p className="text-xl font-light uppercase">{stat.label}</p>
        </div>
      ))}
    </section>
  );
};

export default ExperienceSummary;
