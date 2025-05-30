import type { Metadata } from "next"
import { defaultMetadata } from "@/app/metadata"

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Counter - Todo App',
}

export default function CounterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}