import { GroupFormProvider } from "@/context/GroupFormContext";
import { GroupsProvider } from "@/context/GroupsContext";

export default function GroupsLayout({ children }: { children: React.ReactNode }) {
  return (
    <GroupsProvider>
      <GroupFormProvider>
        {children}
      </GroupFormProvider>
    </GroupsProvider>
  );
}
