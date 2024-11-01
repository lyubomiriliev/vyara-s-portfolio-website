export const ExperienceSummary: React.FC = () => {
  const stats = [
    { label: "Projects", count: "500+" },
    { label: "Happy Clients", count: "300+" },
    { label: "Completed Campaigns", count: "100+" },
    { label: "Years Experience", count: "13+" },
  ];

  return (
    <section className="flex justify-around bg-secondary text-white py-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <h4 className="text-3xl font-bold">{stat.count}</h4>
          <p>{stat.label}</p>
        </div>
      ))}
    </section>
  );
};

export default ExperienceSummary;
