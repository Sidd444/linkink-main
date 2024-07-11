"use client";

import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center mt-28">
          <h1 className="shadow-lg hover-target">
            Welcome to Linkink
          </h1>
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4 hover-target" >
        Redefining Fashion with Technology
        </div>
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Shop Now
        </button>
      </motion.div >
    </>
  );
}

export default Home;