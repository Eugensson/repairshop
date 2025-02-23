import { CircleCheck, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  result: {
    data?: {
      message?: string;
    };
    serverError?: string;
    validationErrors?: Record<string, string[] | undefined>;
  };
};

const MessageBox = ({
  type,
  content,
}: {
  type: "success" | "error";
  content: React.ReactNode;
}) => (
  <div
    className={cn(
      "flex items-center gap-2 px-4 py-2 my-2 rounded-lg bg-accent",
      type === "success"
        ? "text-green-500 bg-green-500/25"
        : "text-red-500 bg-red-500/25"
    )}
  >
    {type === "success" ? (
      <CircleCheck className="text-green-500" />
    ) : (
      <TriangleAlert className="text-red-500" />
    )}
    {content}
  </div>
);

export function DisplayServerActionResponse({ result }: Props) {
  const { data, serverError, validationErrors } = result;

  return (
    <>
      {data?.message && (
        <MessageBox type="success" content={`Success. ${data.message}`} />
      )}
      {serverError && <MessageBox type="error" content={serverError} />}
      {validationErrors && (
        <MessageBox
          type="error"
          content={Object.keys(validationErrors).map((key) => (
            <p key={key}>{`${key}: ${
              validationErrors[key as keyof typeof validationErrors]
            }`}</p>
          ))}
        />
      )}
    </>
  );
}
