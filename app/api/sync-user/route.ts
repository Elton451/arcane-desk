import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, auth0Id, name } = await req.json();

    if (!email || !auth0Id) {
      return NextResponse.json(
        { error: "Email e Auth0 ID são obrigatórios" },
        { status: 400 },
      );
    }

    const user = await prisma.user.upsert({
      where: { auth0Id: auth0Id },
      update: {
        email: email,
        name: name,
        lastLoginAt: new Date(),
      },
      create: {
        email: email,
        auth0Id: auth0Id,
        name: name,
        createdAt: new Date(),
        lastLoginAt: new Date(),
      },
    });

    return NextResponse.json({ status: "ok", user });
  } catch (error) {
    console.error("Erro ao sincronizar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar usuário" },
      { status: 500 },
    );
  }
}
