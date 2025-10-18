import { HomeView } from "../../components/HomeView";

import { AnimatePresence } from "framer-motion";


export default async function HomePage() {

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
            <HomeView
              key="home"
              initialMode={'beginner'}
            />
          
        </AnimatePresence>
      </main>
    </div>
  );
}