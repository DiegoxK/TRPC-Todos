import Navigation from "./navigation";

export default function Sidebar() {
  return (
    <section className="fixed hidden h-screen max-h-screen flex-col bg-background p-6 shadow-md md:flex md:w-[20rem]">
      <Navigation />
    </section>
  );
}
