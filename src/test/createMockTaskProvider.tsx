import {
  CreatorTaskProvider,
  TaskProviderResolvers,
} from "../Tasks/context/TaskProvider";

export function createMockTasksProvider(
  resolvers: Partial<TaskProviderResolvers> = {}
) {
  const defaultResolvers: TaskProviderResolvers = {
    tasks: [],
    addTask: vi.fn(),
    getTasks: vi.fn(),
    updTask: vi.fn(),
    getTask: vi.fn(),
  };

  return ({ children }: React.PropsWithChildren) => (
    <CreatorTaskProvider value={{ ...defaultResolvers, ...resolvers }}>
      {children}
    </CreatorTaskProvider>
  );
}
