import Circle from "../circle/Circle";

export default function KhatmasInQuran( { name, percentage }) {
    const degree = percentage * 2 * 1.8

    return(
        <div className="flex flex-col items-center gap-1">
            <Circle
                width={80}
                height={80}
                degree={degree}
                fontSize={16}
                text={`${Math.round(percentage)}%`}
                backgroundColor="var(--main-color)"
                />
            <p className="text-white">{name}</p>
        </div>
    );
}