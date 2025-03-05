
import Lookup from "@/data/Lookup";
import React from "react";

function Hero() {
    return (
        <div className="flex flex-col items-center mt-36 xl:mt-52 gap-2">
            <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>

            <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>


            <div>
            <textarea placeholder={Lookup.INPUT_PLACEHOLDER} id=""></textarea>
            </div>

        </div>
    )
}

export default Hero;
