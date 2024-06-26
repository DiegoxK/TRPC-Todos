import Navigation from "./navigation";

export default function Sidebar() {
  return (
    <section className="sticky top-0 hidden h-screen flex-col bg-background p-6 shadow-md md:flex md:min-w-[20rem]">
      <Navigation />
    </section>
  );
}
