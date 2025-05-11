import Image from "next/image";

interface TriggerItemProps {
    label: string;
    description: string;
    id: string;
}

export const TriggerItem = ({ label, description }: TriggerItemProps) => {
    return (
        <div className="rounded bg-muted p-2 text-xs">
            <div className="flex items-center justify-start gap-2">
                <Image alt="instagram icon" width={16} height={16} src={"/icons/instagram.svg"} />
                <div className="flex flex-col">
                    <p className="font-bold !text-[11px]">{label}</p>
                    <p className="text-muted-foreground text-[9px]">{description}</p>
                </div>

            </div>



        </div>
    );
};
