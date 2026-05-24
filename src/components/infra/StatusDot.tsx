import clsx from "clsx";

type Tone = "green" | "amber" | "red" | "blue" | "purple" | "gray";

export function StatusDot({
    tone = "green",
    pulse = false,
    className,
    size,
}: {
    tone?: Tone;
    pulse?: boolean;
    className?: string;
    size?: number;
}) {
    const style = size ? { width: size, height: size } : undefined;
    return (
        <span
            className={clsx("infra-dot", `infra-dot--${tone}`, pulse && "infra-dot--pulse", className)}
            style={style}
            aria-hidden="true"
        />
    );
}
