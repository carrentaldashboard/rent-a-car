
import CustomerInfo from "../CustomerInfo";
import Nav from "../Nav";
import Sidebar from "../Sidebar";

export default function CustomerInfoMainPage() {
  return (
    <div className="w-full">
      <div className="flex justify-start items-start relative flex-wrap">
        <Sidebar />
        <Nav />
        <div className="w-fit h-fit mt-[90px] pt-5">
          <CustomerInfo/>
        </div>
      </div>
    </div>
  );
}
