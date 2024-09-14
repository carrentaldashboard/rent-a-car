import { formatDate, formatId } from "@/app/Components/functions/formats";

export default function ThirdPage({ customersName, id }: any) {
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];

  return (
    <div
      className={`w-full h-[1123px] flex justify-center flex-wrap items-start gap-x-[5%] gap-y-[5%] py-7 px-6 relative bg-white`}
    >
      <div className="w-full h-fit  rounded-[10px] flex flex-col justify-start items-center">
        <div className="w-full h-fit flex justify-between items-center mt-1">
          <div className="w-[50%] h-fit flex flex-col justify-start items-start text-[14px] font-[400] leading-[17px] text-black">
            <span className=" text-[17px] font-[700] leading-[20px] text-transparent">
              Contract To:
            </span>
            <span className="text-transparent">
              {customersName ? customersName : "---"}
            </span>

            <h2 className="w-full h-fit rounded-[10px] text-black font-[400] text-[18px] leading-[21px] text-start">
              Contract Number:
              <span className="font-[600]"> #{formatId(id)}</span>
            </h2>
            <span className=" font-[600] text-[18px] leading-[21px] ">
              Issue Date:{" "}
              <span className="font-[400]">{formatDate(todayDate)}</span>
            </span>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col justify-between items-center">
          <div className="w-full flex flex-col justify-start items-start rounded-[5px] overflow-hidden mt-6">
            <div className="w-[100%] h-fit flex justify-start items-center text-[16px] font-[600] py-3 px-5 bg-light-grey ">
              1. Your contract with us.
            </div>
            <div className="w-[100%] h-fit flex justify-start items-center py-1 px-5 text-[14px] font-[400] text-justify leading-[21px]">
              When you sign the front page of this agreement, you accept the
              conditions set out In this agreement. Please read carefully. If
              there Is anything you do not understand, ask a staff member to
              explain it. Ride Ease Car Rental Is acting as a rental company
              with the vehicle of its property only, in all other cases, the
              agreement Is meant as a brokerage service where Ride Ease Car
              Rental stands as an Intermediary. In any case, the terms and
              conditions as wet as the responsibility are set by this agreement
              between Ride Ease Car Rental and the client that signs the
              agreement{" "}
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-start rounded-[5px] overflow-hidden mt-3">
            <div className="w-[100%] h-fit flex justify-start items-center text-[16px] font-[600] py-3 px-5 bg-light-grey ">
              1. Your contract with us.
            </div>
            <div className="w-[100%] h-fit flex justify-start items-center py-1 px-5 text-[14px] font-[400] text-justify leading-[21px]">
              When you sign the front page of this agreement, you accept the
              conditions set out In this agreement. Please read carefully. If
              there Is anything you do not understand, ask a staff member to
              explain it. Ride Ease Car Rental Is acting as a rental company
              with the vehicle of its property only, in all other cases, the
              agreement Is meant as a brokerage service where Ride Ease Car
              Rental stands as an Intermediary. In any case, the terms and
              conditions as wet as the responsibility are set by this agreement
              between Ride Ease Car Rental and the client that signs the
              agreement{" "}
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-start rounded-[5px] overflow-hidden mt-3">
            <div className="w-[100%] h-fit flex justify-start items-center text-[16px] font-[600] py-3 px-5 bg-light-grey ">
              1. Your contract with us.
            </div>
            <div className="w-[100%] h-fit flex justify-start items-center py-1 px-5 text-[14px] font-[400] text-justify leading-[21px]">
              When you sign the front page of this agreement, you accept the
              conditions set out In this agreement. Please read carefully. If
              there Is anything you do not understand, ask a staff member to
              explain it. Ride Ease Car Rental Is acting as a rental company
              with the vehicle of its property only, in all other cases, the
              agreement Is meant as a brokerage service where Ride Ease Car
              Rental stands as an Intermediary. In any case, the terms and
              conditions as wet as the responsibility are set by this agreement
              between Ride Ease Car Rental and the client that signs the
              agreement{" "}
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-start rounded-[5px] overflow-hidden mt-3">
            <div className="w-[100%] h-fit flex justify-start items-center text-[16px] font-[600] py-3 px-5 bg-light-grey ">
              1. Your contract with us.
            </div>
            <div className="w-[100%] h-fit flex justify-start items-center py-1 px-5 text-[14px] font-[400] text-justify leading-[21px]">
              When you sign the front page of this agreement, you accept the
              conditions set out In this agreement. Please read carefully. If
              there Is anything you do not understand, ask a staff member to
              explain it. Ride Ease Car Rental Is acting as a rental company
              with the vehicle of its property only, in all other cases, the
              agreement Is meant as a brokerage service where Ride Ease Car
              Rental stands as an Intermediary. In any case, the terms and
              conditions as wet as the responsibility are set by this agreement
              between Ride Ease Car Rental and the client that signs the
              agreement{" "}
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-start rounded-[5px] overflow-hidden mt-3">
            <div className="w-[100%] h-fit flex justify-start items-center text-[16px] font-[600] py-3 px-5 bg-light-grey ">
              1. Your contract with us.
            </div>
            <div className="w-[100%] h-fit flex justify-start items-center py-1 px-5 text-[14px] font-[400] text-justify leading-[21px]">
              When you sign the front page of this agreement, you accept the
              conditions set out In this agreement. Please read carefully. If
              there Is anything you do not understand, ask a staff member to
              explain it. Ride Ease Car Rental Is acting as a rental company
              with the vehicle of its property only, in all other cases, the
              agreement Is meant as a brokerage service where Ride Ease Car
              Rental stands as an Intermediary. In any case, the terms and
              conditions as wet as the responsibility are set by this agreement
              between Ride Ease Car Rental and the client that signs the
              agreement{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}