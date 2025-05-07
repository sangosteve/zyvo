import { useTriggerModal } from '@/stores/use-trigger-modal';
import { TRIGGER_OPTIONS } from '@/constants/trigger-options';
import { Dialog, DialogHeader } from '@/components/ui/dialog';
import { DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export function AddTriggerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { addTrigger } = useTriggerModal();

    const handleSelect = (triggerId: string) => {
        const selected = TRIGGER_OPTIONS.find(t => t.id === triggerId);
        if (selected) {
            addTrigger(selected); // ✅ Add selected trigger to Zustand
            onClose(); // ✅ Close modal after selection
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Start automation when...</DialogTitle>
                    <DialogDescription>
                        Choose an Instagram event that will trigger this automation.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {TRIGGER_OPTIONS.map((trigger) => (
                        <button
                            key={trigger.id}
                            onClick={() => handleSelect(trigger.id)}
                            className="p-4 rounded-lg border text-left transition hover:shadow-md bg-muted"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                {/* Replace with icon if needed */}
                                <h3 className="text-sm font-semibold">{trigger.label}</h3>
                            </div>
                            <p className="text-xs text-muted-foreground">{trigger.description}</p>
                        </button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
