import prismadb from "@/lib/prismadb";
import LawyerForm from "../components/lawyerForm";
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
interface lawyerIdProps{
    params:{
        lid:string
    }
}


export default async function LawyerPage({params}:lawyerIdProps){
    const lawyer = await prismadb.lawyer.findUnique({
        where:{
            id: params.lid
        },
    })

    const { userId } = auth()
    if (userId) {
        const user = await prismadb.user.findUnique({ where: { id: userId } })
        if (!user) {
            await prismadb.user.create({ data: { id: userId } })
        }
        else {
            if (user.role !== 'ADMIN') {
                // redirect to home page
                redirect('/')
            }
        }
    }

    const category = await prismadb.category.findMany()
    return(
        <LawyerForm 
        initialData={lawyer}
        categories={category}
        />

    )

}