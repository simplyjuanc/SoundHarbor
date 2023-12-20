import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options.auth";
import { NextRequest, NextResponse } from "next/server";
import { JWT, getToken } from "next-auth/jwt";

// async (req:NextRequest, res:NextResponse) => {
//   const session = await getServerSession(req, res, authOptions)
//   if (session) {
//     // Signed in
//     console.log("Session", JSON.stringify(session, null, 2))
//   } else {
//     // Not Signed in
//     res.status(401)
//   }
//   res.end()
// }


async function getServerApiAuthToken(req: NextRequest):Promise<JWT | null> {
  try {
    const token = await getToken({ req });
    console.log('getServerApiAuthToken - token', token)
    if (!token) throw new Error('No token found');
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/* 

async function getServerSideProps(context) {
  return {
    props: {
      session: await getServerSession(
        context.req,
        context.res,
        authOptions
      ),
    },
  }
}
 */
export { 
  // getServerSideProps,
  getServerApiAuthToken, }