import { cn } from "@/lib/utils/format";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const Component = Tag as any;
  return (
    <Component className={cn("mx-auto w-full max-w-content px-5 sm:px-8", className)}>
      {children}
    </Component>
  );
}
