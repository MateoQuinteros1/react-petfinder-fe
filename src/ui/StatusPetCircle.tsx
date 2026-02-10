type StatusPetCircleProps = {
  status: "lost" | "found";
};

const StatusPetCircle = ({ status }: StatusPetCircleProps) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`size-4 rounded-full ${status === "lost" ? "bg-red-700" : "bg-green-700"}`}
      ></div>
      <p className="opacity-80 text-base">
        {status === "lost" ? "Perdido" : "Encontrado"}
      </p>
    </div>
  );
};

export default StatusPetCircle;
