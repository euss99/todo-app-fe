"use client"

import { useCounterStore } from "@/store/useCounterStore"

export default function CounterPage() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Counter Example</h1>
        <div className="text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">{count}</div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Decrement
          </button>
          <button
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Increment
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}