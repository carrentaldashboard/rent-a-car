export default function Rental() {
  return (
    <div className="w-full h-fit flex justify-between flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 rounded-[10px] bg-light-grey border-2 border-grey bg-light-grey mt-5">
      <div className="w-[35%] h-fit flex flex-col justify-start items-start bg-red-30">
        <div className="w-full h-fit flex justify-between items-start py-[3px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Rental Price Per Hour:
          </p>
          <p className="w-[15%] text-start font-[400] text-[18px] leading-[27px]">
            8$
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-t-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Rental Price Per Week:
          </p>
          <p className="w-[15%] text-start font-[400] text-[18px] leading-[27px]">
            150$
          </p>
        </div>
      </div>
      <div className="w-[35%] h-fit flex flex-col justify-start items-start bg-red-30 me-10">
        <div className="w-full h-fit flex justify-between items-start py-[3px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Rental Price Per Day:{" "}
          </p>
          <p className="w-[15%] text-start font-[400] text-[18px] leading-[27px]">
            90$
          </p>
        </div>
        <div className="w-full h-fit flex justify-between items-start py-[3px] border-t-[2px]">
          <p className="font-[400] text-[18px] leading-[27px]">
            Rental Price Per Month:
          </p>
          <p className="w-[15%] text-start font-[400] text-[18px] leading-[27px]">
            400$
          </p>
        </div>
      </div>
    </div>
  );
}