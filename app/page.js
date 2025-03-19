import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="text-white flex flex-col items-center justify-center h-[45vh] gap-4">
        <div className="text-5xl font-bold flex justify-center items-center">
          <p>Buy Me a Chai</p>
          <div><Image src="/images/tea.png" width={100} height={100} alt="error loading" /></div>
        </div>
        <p className="text-center w-[50vw]">
          Support creators you love by fueling their passion — one chai at a time. 
          Join now to connect, contribute, and enjoy exclusive content tailored just for you.
        </p>
        <div>
          <Link href="/login"><button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            Start Now
          </button></Link>
          <Link href="/about"><button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            Read More
          </button></Link>
        </div>
      </section>

      <hr className="opacity-20" />

      <section className="text-white flex flex-col">
        <span className="text-2xl font-bold text-center my-7">
          Supporters can get their favourite creator a chai
        </span>
        <div className="flex justify-around">
          <div className="flex flex-col items-center justify-center">
            <Image src="/images/laptop.gif" width={90} height={90} alt="error" />
            <span className="font-bold">Fans Want to Help</span>
            <span>your fans are available to support you</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src="/images/coin.gif" width={110} height={110} alt="error" />
            <span className="font-bold">Fans Want to Contribute</span>
            <span>your fans are willing to contribute monetarily</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src="/images/collaborate.gif" width={90} height={90} alt="error" />
            <span className="font-bold">Fans Want to Collaborate</span>
            <span>your fans are ready to collaborate with you</span>
          </div>
        </div>
        <div className="absolute bottom-0 w-full">
          <Footer/>
        </div>
      </section>
    </>
  );
}
