import React from 'react'
import aboutimg from '../assets/aboutimg.png'

const About = () => {
    return (
        <>
            <h2 className="text-3xl md:text-5xl font-semibold text-center mt-4 text-green-700">About Us</h2>
            <div className="md:flex flex-col md:flex-row md:gap-5 md:items-center justify-center mt-8 lg:mt-16">
                <div className="w-full md:w-[500px] md:h-[380px] shadow-xl">
                    <img src={aboutimg} alt="about_img" className='w-full h-full ' />
                </div>
                <div className="flex flex-col items-center justify-center mt-6 md:mt-0 bg-gray-100">
                    <div className="max-w-2xl p-6 bg-white rounded-md shadow-xl">
                        <h2 className="text-xl md:text-3xl font-semibold mb-4 text-green-700">Fresh and Healthy One!</h2>
                        <p className="mb-3">
                            Welcome to our website dedicated to exploring the world of <mark>fruits, fast food, and vegetables!</mark>
                        </p>
                        <p className="mb-3">
                            At our platform, we believe in promoting healthy eating habits while still indulging in the occasional treat.
                            Whether you're a fruit enthusiast, a fast food lover, or a veggie aficionado, we've got something for everyone.
                        </p>
                        <p className="mb-3">
                            Our team is passionate about sharing valuable information about the nutritional benefits, cooking tips, and fun
                            facts related to these food categories.
                        </p>
                        <p className="mb-3">
                            Join us on this journey as we delve into the delicious and diverse universe of foods that not only tickle your
                            taste buds but also nourish your body.
                        </p>
                        <p className="mb-3">
                            Feel free to explore our articles, recipes, and resources to make informed choices and enjoy a well-rounded diet.
                        </p>
                        <p className="mb-1"><mark>Stay healthy, stay curious, and happy exploring!</mark></p>
                        <p>- The Fruits, Fast Food, and Vegetables Team</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;




