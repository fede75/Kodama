import { cn } from "@/lib/utils";

type IconName =
  | "home"
  | "settings"
  | "admin"
  | "arrow-left"
  | "plus"
  | "edit"
  | "trash"
  | "info"
  | "close"
  | "droplets"
  | "leaf"
  | "scissors"
  | "shovel"
  | "map-pin"
  | "thermometer"
  | "layers";

type AppIconProps = {
  name: IconName;
  className?: string;
};

export function AppIcon({ name, className }: AppIconProps) {
  const sharedProps = {
    viewBox: "0 0 20 20",
    fill: "none",
    "aria-hidden": "true" as const,
    className: cn("h-5 w-5", className)
  };

  if (name === "home") {
    return (
      <svg {...sharedProps}>
        <path d="M3.5 9.2 10 4l6.5 5.2v6.1a1.2 1.2 0 0 1-1.2 1.2h-2.8v-4.4H7.5v4.4H4.7a1.2 1.2 0 0 1-1.2-1.2V9.2Z" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "settings") {
    return (
      <svg {...sharedProps}>
        <path d="M10 7.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z" stroke="currentColor" strokeWidth="1.45" />
        <path d="M16.1 11.1v-2.2l-1.6-.4a4.8 4.8 0 0 0-.5-1.2l.9-1.4-1.6-1.6-1.4.9c-.4-.2-.8-.4-1.2-.5l-.4-1.6H8l-.4 1.6c-.4.1-.8.3-1.2.5L5 4.3 3.4 5.9l.9 1.4c-.2.4-.4.8-.5 1.2l-1.6.4v2.2l1.6.4c.1.4.3.8.5 1.2l-.9 1.4L5 17.3l1.4-.9c.4.2.8.4 1.2.5l.4 1.6h2.2l.4-1.6c.4-.1.8-.3 1.2-.5l1.4.9 1.6-1.6-.9-1.4c.2-.4.4-.8.5-1.2l1.6-.4Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "admin") {
    return (
      <svg {...sharedProps}>
        <path d="M10 2.8 4.2 5v4.1c0 4 2.6 6.8 5.8 8 3.2-1.2 5.8-4 5.8-8V5L10 2.8Z" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round" />
        <path d="M7.8 9.1a2.2 2.2 0 1 1 4.4 0 2.2 2.2 0 0 1-4.4 0Zm-.3 4.1c.7-.8 1.6-1.2 2.5-1.2s1.8.4 2.5 1.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "arrow-left") {
    return (
      <svg {...sharedProps}>
        <path d="M15.5 10H5.8" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
        <path d="m9.1 6.4-3.3 3.6 3.3 3.6" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "plus") {
    return (
      <svg {...sharedProps}>
        <path d="M10 4.6v10.8M4.6 10h10.8" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "edit") {
    return (
      <svg {...sharedProps}>
        <path d="m13.9 4.9 1.2-1.2a1.7 1.7 0 1 1 2.4 2.4L8.3 15.3l-3.5.9.9-3.5 8.2-7.8Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "trash") {
    return (
      <svg {...sharedProps}>
        <path d="M4.9 6.1h10.2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
        <path d="M7.2 6.1V5a1 1 0 0 1 1-1h3.6a1 1 0 0 1 1 1v1.1" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
        <path d="m6.1 6.1.7 8.8a1.2 1.2 0 0 0 1.2 1.1h3.9a1.2 1.2 0 0 0 1.2-1.1l.7-8.8" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.4 8.5v4.8M11.6 8.5v4.8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "info") {
    return (
      <svg {...sharedProps}>
        <circle cx="10" cy="10" r="6.8" stroke="currentColor" strokeWidth="1.35" />
        <path d="M10 8.3v4.4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
        <circle cx="10" cy="6.2" r=".8" fill="currentColor" />
      </svg>
    );
  }

  if (name === "close") {
    return (
      <svg {...sharedProps}>
        <path d="m6 6 8 8M14 6l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "droplets") {
    return (
      <svg {...sharedProps}>
        <path d="M7.2 5.2C8.7 6.9 10 8.5 10 10a3.1 3.1 0 1 1-6.2 0c0-1.5 1.3-3.1 3.4-4.8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M13.2 3.8C15.5 6.2 17 8.3 17 10.6a4 4 0 0 1-8 0c0-2.1 1.5-4.2 4.2-6.8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "leaf") {
    return (
      <svg {...sharedProps}>
        <path d="M15.8 4.2c-5 .3-8.3 2-10.1 5.1-1 1.8-1 4.1.1 5.7 1.6 2.2 4.8 2.5 7.3 1 3.5-2.2 4.3-6.4 2.7-11.8Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
        <path d="M6.8 13.6c1.7-1.9 3.8-3.5 6.5-4.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "scissors") {
    return (
      <svg {...sharedProps}>
        <circle cx="6.2" cy="6.4" r="1.8" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="6.2" cy="13.6" r="1.8" stroke="currentColor" strokeWidth="1.25" />
        <path d="M8 7.4 15.5 4.8M8 12.6l7.5 2.6M8 9.2l7.5 5.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "shovel") {
    return (
      <svg {...sharedProps}>
        <path d="M12.7 3.9a2.2 2.2 0 0 1 3.1 3.1l-2 2-3.1-3.1 2-2Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
        <path d="m9.8 6.8 3.4 3.4-5.4 5.4a2.2 2.2 0 0 1-3.1-3.1l5.1-5.7Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
        <path d="m4.8 12.9 2.3 2.3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "map-pin") {
    return (
      <svg {...sharedProps}>
        <path d="M10 16.2c2.7-3.3 4.1-5.8 4.1-7.6a4.1 4.1 0 1 0-8.2 0c0 1.8 1.4 4.3 4.1 7.6Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
        <circle cx="10" cy="8.6" r="1.6" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    );
  }

  if (name === "thermometer") {
    return (
      <svg {...sharedProps}>
        <path d="M10 11.3V5.5a1.7 1.7 0 1 1 3.4 0v5.8a3 3 0 1 1-3.4 0Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M11.7 8.3v4.1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <path d="M4.5 12.8 8.2 8.9l2.4 2.3 4.9-5.4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 15.5h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconBadge({
  name,
  className,
  iconClassName
}: {
  name: IconName;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center text-paper/68",
        className
      )}
    >
      <AppIcon name={name} className={cn("h-[1.35rem] w-[1.35rem]", iconClassName)} />
    </span>
  );
}
