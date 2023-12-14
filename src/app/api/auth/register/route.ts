import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';



export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, email, password } = body;

  if (!username || !email || !password) {
    return new NextResponse('No email and/or password in request', {status: 400});
  }
  
  const userExists = await prisma.user.findUnique({where: {email}})
  
  if (userExists) {
    return new NextResponse('User already exists', {status: 400});
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword
    }
  })

  return NextResponse.json(user);
}