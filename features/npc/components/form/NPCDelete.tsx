"use client"
import { Dictionary } from "@/shared/types/i18n";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import deleteNpc from "../../actions/deleteNpc";

interface NpcDeleteProps {
	dict: Dictionary;
	npcId: number;
	redirectUrl?: string;
}

const NpcDelete = ({ dict, redirectUrl, npcId }: NpcDeleteProps) => {
	const handleDeleteNPC = async () => {
		const res = await deleteNpc(npcId);

		if(res?.success) {
			toast(dict.npc.deleted_successfully);
			redirect(redirectUrl || "/")
		}
	}

	return (
		<button
			onClick={handleDeleteNPC}
			className="border-destructive/40 text-destructive hover:bg-destructive/10 rounded-md border px-3 py-1.5 text-sm transition-colors"
		>
			{dict.common.delete}
		</button>
	);
};

export default NpcDelete;
