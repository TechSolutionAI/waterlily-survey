import SurveyForm from "@/components/survey-form";
import { authOptions } from "@/lib/auth";
import { Question } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/login');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/question`, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const dbQuestions = await res.json();
  const questions : Question[] = dbQuestions.map((q: any) => ({
    id: q.id,
    title: q.title,
    description: q.description,
    type: q.type,
    order: q.order,
    required: q.required,
    options: JSON.parse(q.options)
  }));

  return (
    <div className="w-full max-w-3xl  mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center">Welcome to Waterlily Survey App</h1>
      </div>

      <div className="w-full mt-8 flex justify-between">
        <div>Welcome {session.user?.name}</div>
         <form action="/api/auth/signout" method="POST" className="mb-6 flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors w-full sm:w-auto"
          >
            Logout
          </button>
      </form>
      </div>

      <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <SurveyForm questions={questions} />
      </div>

    </div>
  );
}
