import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';



export async function POST(request: NextRequest) {
  const body = await request.json();
  // const { username, email, password } = body;
  const { email, password } = body;

  if (!email || !password) {
    return new NextResponse('No email and/or password in request', { status: 400 });
  }

  console.log({ email, password });

  const userExists = await prisma.user.findUnique({where: {email}})

  if (userExists) {
    return new NextResponse('User already exists', { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  });
  return NextResponse.json(user);
}