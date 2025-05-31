import { defaultMetadata } from "@/app/metadata"

export const metadata = {
  ...defaultMetadata,
  title: "Home - Todo App",
}

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Home!</h1>
    </div>
  )
}