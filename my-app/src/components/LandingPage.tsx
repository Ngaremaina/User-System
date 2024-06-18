import { Link } from "react-router-dom"

const LandingPage: React.FC  = () => {
    return(
        <div className="">
            <div className="bg-gray-100">
                
            <section className="bg-blue-teal-gradient relative bg-blue-600 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden flex
            items-center h-screen">
                
                <div className="h-full absolute top-0 left-0 z-0">
                <img src="https://cdn.pixabay.com/photo/2021/02/03/00/10/receptionists-5975962_1280.jpg" alt = "home" className="w-full cover opacity-20" />
                </div>
                <div className="lg:w-3/4 xl:w-3/4 relative z-5 lg:mt-4">
                <h1 className="text-white text-4xl md:text-5xl xl:text-8xl font-bold">CISA</h1>
                <div>
                    
                    <h1 className="text-white text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">Experience Excellence</h1>
                    <p className="text-blue-100 text-xl md:text-2xl leading-snug mt-4">Your One-Stop Solution for Unmatched Customer Service</p>
                    <p className="text-blue-100 text-xl md:text-2xl leading-snug mt-4">Welcome to CISA, where exceptional customer service is our commitment. At CISA, we understand the importance of a seamless, efficient, and personalized experience. Our dedicated team is here to assist you with all your needs, providing solutions that exceed your expectations.</p>
                    

                   
                    <Link to="/sign in" className="px-8 py-4 bg-teal-500 text-white rounded inline-block mt-8 font-semibold">Sign In</Link>
                    <Link to="/sign up" className="px-8 py-4 bg-teal-500 text-white rounded inline-block mt-8 font-semibold m-3">Sign Up</Link>
                    
                </div>
                </div>
            </section>
            </div>

            </div>

    )
}

export default LandingPage