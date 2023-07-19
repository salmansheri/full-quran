"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  ...props
}) => {
  const router = useRouter();
  return (
    <div
      {...props}
      className="flex items-center justify-center flex-col gap-y-3"
    >
      <h1>{title}</h1>
      <h3>{description}</h3>
      <Button onClick={() => router.refresh()}>Refresh</Button>
    </div>
  );
};

export default EmptyState;
