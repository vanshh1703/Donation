
import banner from "../assets/banner.png"

export default function Home() {
    return (
        <div>
            <header className="flex border-b border-gray-200 py-4 px-6 justify-between items-center">
                <div className="text-xl font-bold text-teal-500">Donation</div>
                <div className="flex gap-4 items-center">
                    <a href="#" className="text-gray-600 hover:text-teal-500 mr-4">Home</a>
                    <a href="#" className="text-gray-600 hover:text-teal-500 mr-4">About</a>
                  
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-teal-600">Donate</button>
                </div>
            </header>
            <main>
                <div className="flex justify-evenly items-center  bg-amber-50 h-96">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-teal-500">Donation</h1>
                        <p className="text-gray-600">Donate to the needy people around you and help them to live a better life </p>
                    </div>
                    <div>
                        <img src={banner} alt="banner" className="w-96 h-80 rounded" />
                    </div>
                </div>
            </main>
        </div>
    )
}