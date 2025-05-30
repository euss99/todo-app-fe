import type { Metadata } from "next"
import type { ReactNode } from "react"

import { defaultMetadata } from "@/app/metadata"


export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Counter - Todo App",
}

export default function CounterLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}