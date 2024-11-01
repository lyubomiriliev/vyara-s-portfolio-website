import { stats } from "../utils/constants";

export const ExperienceSummary: React.FC = () => {
  return (
    <section className="w-full max-w-screen-xl px-36 mx-auto flex justify-around text-white">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="text-center bg-cardBG/80 border-[1px] border-textGray/20 w-56 h-56 justify-center flex flex-col items-center rounded-lg relative overflow-hidden"
        >
          <h4 className="text-4xl font-bold uppercase">{stat.count}</h4>
          <div className="absolute h-24 w-24 blur-3xl bottom-0 rounded-full bg-pinkGlow/70"></div>
          <p className="text-xl font-light uppercase">{stat.label}</p>
        </div>
      ))}
    </section>
  );
};

export default ExperienceSummary;
