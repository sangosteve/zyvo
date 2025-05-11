import { Button } from "@/components/ui/button";
import { useTriggerModal } from "@/stores/use-trigger-modal";
import { Position } from "@xyflow/react";
import { Plus } from "lucide-react";
import { CustomHandle } from "../shared/custom-handle";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TriggerItem } from "./trigger-item";
export function TriggerNode() {
    const { openModal, selectedTriggers } = useTriggerModal();

    return (
        <Card className="rounded-sm border bg-background text-foreground shadow-sm w-60 relative px-4 py-3 space-y-2 hover:border-primary hover:cursor-pointer">

            <CardHeader className="p-0">
                <CardTitle className="text-xs font-bold text-muted-foreground">
                    When…
                </CardTitle>
                <CardDescription className="text-[9px] text-muted-foreground">
                    The automation is triggered when the following occurs…
                </CardDescription>
            </CardHeader>

            <CardContent className="p-0 flex flex-col gap-2">
                {selectedTriggers.map((trigger) => (

                    <TriggerItem id={trigger.id} label={trigger.label} description={trigger.description} />
                ))}

                <CardFooter className="p-0 mt-2">

                    <Button
                        onClick={() => openModal()}
                        size="sm"
                        className="w-full text-xs border border-primary border-dashed bg-transparent text-primary hover:bg-purple-300"
                    >
                        <Plus /> Add Trigger
                    </Button>

                </CardFooter>

                <CustomHandle type="source" position={Position.Right} />
            </CardContent>
        </Card>
    );
}
