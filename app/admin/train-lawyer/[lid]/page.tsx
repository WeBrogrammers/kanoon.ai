import prismadb from "@/lib/prismadb";
import LawyerForm from "./components/lawyerForm";

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
    const category = await prismadb.category.findMany()
    return(
        <LawyerForm 
        initialData={lawyer}
        categories={category}
        />

    )

}