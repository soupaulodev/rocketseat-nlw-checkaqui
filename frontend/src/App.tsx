import { AttendeeList } from "./components/attendee-list";
import { Header } from "./components/header";

export function App() {
  return (
    <div className="max-w-[1216px] h-screen mx-auto py-5 flex flex-col gap-5 max-[1300px]:px-6 p-0">
      <Header />
      <AttendeeList />
    </div>
  );
}
