import { Lawyer } from "@prisma/client"
import { Brain } from 'lucide-react';
import Link from 'next/link'

interface lawyerFormProps {
  data: Lawyer[]
}

export default function LawyerCard({ data }: lawyerFormProps) {
  console.log(data);

  const convertToLocalTime = (date: Date) => {
    // Convert the input string into a Date object
    const dateObject: Date = new Date(date);

    // Options for formatting the date and time
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
    };

    // Format the Date object using toLocaleString with the specified options
    const formattedDateTime: string = dateObject.toLocaleString('en-US', options);
    return formattedDateTime

  }
  return (
    <>
      {
        data?.map((ele) => (
          <div className="p-4 md:w-1/3" key={ele.id}>
            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                  <Brain />
                </div>
                <h2 className="text-gray-900 text-lg title-font font-medium">{ele.name}</h2>
              </div>
              <div className="flex-grow">
                <p className="leading-relaxed text-base">{ele.description}</p>
                <div className="flex flex-col p-2 border-b-2">
                  <p>created at : {convertToLocalTime(ele.createdAt)}</p>
                  <p>updated at : {convertToLocalTime(ele.updatedAt)}</p>
                </div>
                <Link href={`/admin/train-lawyer/${ele.id}`} className="mt-3 text-indigo-500 inline-flex items-center">
                  Edit lawyer
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

        ))}</>
  )
}