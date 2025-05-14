"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useTriggerStore } from "@/stores/use-trigger-store";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils"; // make sure you have this utility
import { TRIGGER_OPTIONS } from "@/constants/trigger-options";




const AddTriggerSheet = () => {
    const {
        open,
        triggerNodeId,
        closeSheet,
        triggerType,
        setTriggerType,
    } = useTriggerStore();

    const queryClient = useQueryClient();
    const [openPopover, setOpenPopover] = useState(false);

    const { data: triggerData, isLoading } = useQuery({
        queryKey: ["trigger", triggerNodeId],
        queryFn: async () => {
            if (!triggerNodeId) return null;
            const res = await axios.get(`/api/triggers/${triggerNodeId}`);
            return res.data;
        },
        enabled: !!triggerNodeId && open,
    });

    useEffect(() => {
        if (triggerData?.event) {
            setTriggerType(triggerData.event);
        }
    }, [triggerData?.event, setTriggerType]);

    const updateTrigger = useMutation({
        mutationFn: async (type: string) => {
            if (!triggerNodeId) throw new Error("No trigger node ID");
            const res = await axios.patch(`/api/triggers/${triggerNodeId}`, {
                event: type,
            });
            return res.data;
        },
        onSuccess: () => {
            if (triggerNodeId) {
                queryClient.invalidateQueries({ queryKey: ["trigger", triggerNodeId] });
            }
        },
    });

    const handleSave = async () => {
        if (!triggerType || !triggerNodeId) return;
        try {
            await updateTrigger.mutateAsync(triggerType);
            closeSheet();
        } catch (error) {
            console.error("Failed to save trigger:", error);
        }
    };

    const selectedLabel = useMemo(() => {
        return TRIGGER_OPTIONS.find((option) => option.value === triggerType)?.label;
    }, [triggerType]);

    return (
        <Sheet open={open} onOpenChange={closeSheet}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Trigger Details</SheetTitle>
                    <SheetDescription>
                        Choose what will trigger this automation.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-2 w-full">
                    <label className="text-sm font-medium">Trigger Event</label>

                    <Popover modal={true} open={openPopover} onOpenChange={setOpenPopover}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openPopover}
                                className="w-full justify-between"
                                disabled={isLoading}
                            >
                                {selectedLabel || "Select a trigger event"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" >
                            <Command>
                                <CommandInput placeholder="Search trigger..." />
                                <CommandEmpty>No trigger found.</CommandEmpty>
                                <CommandGroup>
                                    {TRIGGER_OPTIONS.map((option) => (
                                        <CommandItem
                                            key={option.value}
                                            value={option.label}
                                            onSelect={() => {
                                                setTriggerType(option.value);
                                                setOpenPopover(false);
                                            }}
                                            className="flex flex-col items-start px-4 py-2"
                                        >
                                            <div className="flex w-full items-center">
                                                <Image
                                                    src="/icons/instagram.svg"
                                                    alt="Instagram icon"
                                                    width={16}
                                                    height={16}
                                                    className="mr-2"
                                                />
                                                <span className="font-medium">{option.label}</span>
                                                <Check
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        triggerType === option.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </div>
                                            {option.description && (
                                                <p className="text-sm text-muted-foreground pl-6">
                                                    {option.description}
                                                </p>
                                            )}
                                        </CommandItem>
                                    ))}

                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    <Button
                        className="w-full"
                        onClick={handleSave}
                        disabled={updateTrigger.isPending || isLoading}
                    >
                        {updateTrigger.isPending ? "Saving..." : "Save Trigger"}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default AddTriggerSheet;
