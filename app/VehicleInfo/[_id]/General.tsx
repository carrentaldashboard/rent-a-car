import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Rental from "./Rental";
import Insurance from "./Insurance";
import Other from "./Other";
import Additional from "./Additional";
import Damages from "./Damages";

export default function General() {
  const [activeIndex, setActiveIndex] = useState<any>(0);

  const toggleAccordion = (index: any) => {
    if (activeIndex === index) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };

  const accordionData = [
    {
      title: "Rental Info",
      content: <Rental />,
    },
    {
      title: "Insurance Info",
      content: <Insurance />,
    },
    {
      title: "Features",
      content: <Additional />,
    },
    {
      title: "Others",
      content: <Other />,
    },
  ];

  return (
    <div className="w-[100%] h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] border-grey">
      <div id="accordion-collapse" className="w-full">
        {accordionData.map((item, index) => (
          <div key={index}>
            <div id={`accordion-collapse-heading-${index + 1}`}>
              <button
                type="button"
                className="font-[600] w-[100%] h-[47px] flex items-center justify-between p-5 border-b-[1px] border-grey dark:bg-dark1 bg-light-grey"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`accordion-collapse-body-${index + 1}`}
              >
                <span>{item.title}</span>
                <FaChevronDown
                  className={`w-3 h-3 transition-transform ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
            </div>
            <div
              id={`accordion-collapse-body-${index + 1}`}
              className={`${
                activeIndex === index ? "block" : "hidden"
              } w-[100%] h-[150px] border-b-[1px] border-grey`}
              aria-labelledby={`accordion-collapse-heading-${index + 1}`}
            >
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
