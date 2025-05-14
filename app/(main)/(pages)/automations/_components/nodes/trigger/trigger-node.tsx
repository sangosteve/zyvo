import { Position } from "@xyflow/react";
import { CustomHandle } from "../shared/custom-handle";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTriggerStore } from "@/stores/use-trigger-store";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { TRIGGER_OPTIONS } from "@/constants/trigger-options";  // Ensure this file exists and contains the icon/label/description

async function getTrigger(id: string) {
    const res = await axios.get(`/api/triggers/${id}`);
    return res.data;
}

export function TriggerNode({ id }: { id: string }) {
    const { openSheet } = useTriggerStore();

    const { data: trigger, isLoading } = useQuery({
        queryKey: ["trigger", id],
        queryFn: () => getTrigger(id),
    });

    if (isLoading) return <p>Loading...</p>;

    // Get the trigger options based on event type
    const triggerOption = TRIGGER_OPTIONS.find((option) => option.value === trigger?.event);

    return (
        <Card
            onClick={(e) => openSheet(id)}
            className="rounded-sm border bg-background text-foreground shadow-sm  relative px-4 py-3 space-y-2 hover:border-primary hover:cursor-pointer"
        >
            <CardHeader className="p-0">
                <CardTitle className="text-xs font-bold text-muted-foreground">
                    When…
                </CardTitle>
                <CardDescription className="text-[9px] text-muted-foreground">
                    The automation is triggered when the following occurs…
                </CardDescription>
            </CardHeader>

            <CardContent className="p-0 flex flex-col gap-2">
                {/* Display trigger icon and label */}
                {/* {triggerOption && (
                    <div className="flex items-center space-x-2">
                        <Image src={triggerOption.icon} alt={triggerOption.label} width={16} height={16} />
                        <div className="text-xs font-medium text-primary">
                            {triggerOption.label}
                        </div>
                    </div>
                )}

                <div className="text-[9px] text-muted-foreground pl-6">
                    {triggerOption?.description || "No description available"}
                </div> */}
                {triggerOption && (<div className="flex items-center justify-start gap-2 border p-2 rounded">
                    <Image
                        src={triggerOption?.icon || "/icons/instagram.svg"}
                        alt={triggerOption?.label || "Instagram icon"}
                        width={16}
                        height={16}
                    />
                    <div className="flex flex-col">

                        <p className="text-[11px] font-semibold">{triggerOption?.label || "Unknown Trigger"}</p>
                        <p className="text-[9px] text-muted-foreground">{triggerOption?.description || "No description available"}</p>
                    </div>
                </div>
                )}
                <CardFooter className="p-0 mt-2" />
                <CustomHandle type="source" position={Position.Right} />
            </CardContent>
        </Card>
    );
}
