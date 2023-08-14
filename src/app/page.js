import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function Home() {

  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/profile")
  }
  return (
    <>
      <div className="border flex flex-col justify-center items-center mt-4 p-6">
        <div className="container mx-auto bg-[#2C2F44] rounded-lg h-auto border w-full p-8 flex flex-col justify-center gap-y-8">
          <h1 className="border lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-bold text-white">Welcome to ORU Phones</h1>
          <p className="border text-xl font-medium text-white">C2C online marketplace for Old, Refurbished & Used phones</p>
        </div>
        <div className="container mx-auto rounded-lg border w-full p-6 flex flex-col gap-y-8 mt-8">
          <p className="border text-xl font-light text-justify">
            A tech start-up, India&apos;s first-ever online C2C marketplace dedicated to buying and selling Old, Refurbished & Used phones.
            In 2020, only 20 million units of used smartphones were traded while there were more than 100 million smartphones just left idle at home, sitting in drawers. The cumulative second-hand market will reach 245 million units by 2025 of which only about 20% units will be traded despite the strong demand for used smartphones in India.
            We aim to bring those unused second-hand smartphones to the market so that &quot;Smartphone owners (sellers)&quot; reap profits by selling their unused assets and buyers can afford their desired smartphones.
            This is achievable with our strong technology stack and a dedicated team of professionals.
          </p>
        </div>
      </div>
    </>
  )
}