import { defaultMetadata } from "@/app/metadata"

export const metadata = {
  ...defaultMetadata,
  title: "Home - Todo App",
}

export default function Home() {
  return (
    <div className="min-h-full flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Home!</h1>
    </div>
  )
}