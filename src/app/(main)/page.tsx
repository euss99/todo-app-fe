import TodoHeader from "@/components/todo/TodoHeader";
import TodoList from "@/components/todo/TodoList";

export const metadata = {
  title: "Home - Todo App",
};

export default function Home() {
  return (
    <div className="p-6 mt-16 lg:mt-6">
      <div className="max-w-5xl mx-auto">
        <TodoHeader />
        <TodoList />
      </div>
    </div>
  );
}