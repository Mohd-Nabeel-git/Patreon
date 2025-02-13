import Image from "next/image"
import Layout from "@/components/overflow"
import Footer from "@/components/Footer"

export default async function Page({ params }) {
    const id = (await params).username
    return(<Layout>
    <div className="relative w-full h-[40vh]">
      <Image className="object-cover" src="/images/cover.jpeg" fill={true}/>
    </div>
    <div className="relative">
      <Image className="absolute left-[47%] rounded-full border-2 border-white -bottom-10" src="/images/cat.jpg" height={100} width={100}/>
    </div>
    <div className="text-white flex justify-center mt-12">
      @{id}
    </div>
    <div className="text-white flex flex-col gap-1 items-center">
      <h1 className="text-2xl font-bold">JB2A - Jules&Ben's Animated Assets</h1>
      <span>Creating Animated art for VTT's</span>
      <div className="flex gap-2 text-sm text-gray-400">
        <p>1100 members &nbsp;.</p>
        <p>500post &nbsp;.</p>
        <p>$1000/release &nbsp;</p>
      </div>
      <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-10 py-2.5 me-2 my-5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Join for free</button>
    </div>
    <div className="flex w-[80vw] mx-auto gap-3 text-white mt-7">
      <div className="supporters w-1/2 bg-slate-800 rounded-lg border border-gray-600 p-7">
        <h1 className="font-bold text-lg text-center mb-5">SUPPORTERS</h1>
        <div className="flex items-center"><Image src="/images/pay.gif" height={35} width={35}/><p className="text-sm">Nabeel donated an amount of <span className="font-bold">50$</span> with a message "I support you bro ❤️"</p></div>
        <div className="flex items-center"><Image src="/images/pay.gif" height={35} width={35}/><p className="text-sm">Nabeel donated an amount of <span className="font-bold">50$</span> with a message "I support you bro ❤️"</p></div>
        <div className="flex items-center"><Image src="/images/pay.gif" height={35} width={35}/><p className="text-sm">Nabeel donated an amount of <span className="font-bold">50$</span> with a message "I support you bro ❤️"</p></div>
        <div className="flex items-center"><Image src="/images/pay.gif" height={35} width={35}/><p className="text-sm">Nabeel donated an amount of <span className="font-bold">50$</span> with a message "I support you bro ❤️"</p></div>
      </div>
      <div className="w-1/2 bg-slate-800 rounded-lg border border-gray-600 p-7">
      <h1 className="font-bold text-lg text-center mb-5">MAKE A PAYMENT</h1>
      <div className="flex flex-col gap-2">
        <input type="text" placeholder="Enter Name" className="w-full p-3 rounded-lg bg-slate-900"/>
        <input type="text" placeholder="Enter Message" className="w-full p-3 rounded-lg bg-slate-900"/> 
        <input type="text" placeholder="Enter Amount" className="w-full p-3 rounded-lg bg-slate-900"/>
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-3 w-1/4 self-center">Pay</button>
      </div>
      <div className="flex justify-center gap-5 my-2">
        <button className="bg-slate-900 p-3 rounded-lg border border-gray-500">Pay $10</button>
        <button className="bg-slate-900 p-3 rounded-lg border border-gray-500">Pay $20</button>
        <button className="bg-slate-900 p-3 rounded-lg border border-gray-500">Pay $30</button>
      </div>
      </div>
    </div>
    <div className="invisible">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur esse quisquam magnam consectetur sunt debitis doloribus qui magni? Mollitia a quidem, adipisci quod sint at aliquid dolores molestiae numquam, velit sit fugiat magnam, debitis excepturi illum illo aliquam cum reprehenderit. Fugit molestias, tenetur doloribus dolorem nobis dicta corporis in esse commodi similique voluptatibus, eaque non quisquam distinctio modi architecto soluta rem dolor eligendi at tempora, adipisci totam? Tempora ea 
    </div>
    <div>
      <Footer/>
    </div>
    </Layout>)
  }