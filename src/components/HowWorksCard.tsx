interface HowWorksCardProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

const HowWorksCard = ({ children, title, description }: HowWorksCardProps) => {
  return (
    <div className="border border-gray-300 rounded-xl flex flex-col items-center px-5 bg-white">
      <div className="bg-[#D5E8E7] rounded-full h-18 w-18 flex items-center justify-center mt-6">
        {children}
      </div>
      <h1 className="text-lg font-semibold mt-12 text-center">{title}</h1>
      <p className="text-gray-600 mt-6 text-center mb-6">{description}</p>
    </div>
  );
};

export default HowWorksCard;
