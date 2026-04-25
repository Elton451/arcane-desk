"use server"

import getUser from "@/features/auth/getUser"
import { prisma } from "@/lib/prisma"

const deleteNpc = async (npcId: number) => {
	const user = await getUser();

	if(!user) return;

	const npc = await prisma.npc.delete({
		where: {
			id: npcId
		}
	})

	if(!npc) {
		return {
			success: false,
			message: "npc_not_found"
		}
	}

	return {
		success: true,
		data: npc
	}
}

export default deleteNpc;
