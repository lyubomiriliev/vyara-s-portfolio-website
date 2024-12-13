export const containerVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      staggerChildren: 0.3, // Delay between each child animation
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

export const titleVariant = {
  hidden: { opacity: 0, scale: 0.7 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};
