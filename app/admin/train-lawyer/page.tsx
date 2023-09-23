import prismadb from "@/lib/prismadb";
import { PlusSquare } from "lucide-react";
import Link from 'next/link'
import LawyerCard from './components/lawyercard'

export default async function AdminPage() {
    const lawyers = await prismadb.lawyer.findMany()
    // console.log(lawyers)
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
            ADMIN DASHBOARD
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            Train And Edit Your Lawyer
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
            {/* create a new lawyer */}
          <div className="p-4 md:w-1/3">
            <div className="flex items-center justify-center rounded-lg h-full bg-green-200 p-8 flex-col">
                <Link href='/admin/train-lawyer/create-new'>
              <button className="flex items-center justify-center flex-col cursor-pointer bg-green-200 p-5 rounded-lg border-dashed border-2">
                <PlusSquare className="w-10 h-10 text-indigo-400" />
                <h3>Create a new</h3>
              </button>
              </Link>
            </div>
          </div>
         <LawyerCard data={lawyers} />
        </div>
      </div>
    </section>
  );
}
