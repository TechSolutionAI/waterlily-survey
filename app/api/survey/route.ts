import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await req.json();

        // Adjust the fields below to match your Survey table schema
        const surveyResponse = await prisma.survey.create({
            data: {
                userId: session.user.id, 
                response: JSON.stringify(data.response),
            },
        });

        return NextResponse.json(surveyResponse, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save survey response.' }, { status: 500 });
    }
}