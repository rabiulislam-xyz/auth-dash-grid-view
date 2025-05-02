
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Users, Home } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const NavItem = ({ to, icon: Icon, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        )
      }
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </NavLink>
  );
};

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="sticky top-0 flex flex-col h-full p-4">
        <div className="flex h-14 items-center px-2">
          <h2 className={cn("text-lg font-semibold text-white", !isOpen && "hidden")}>
            Admin Panel
          </h2>
          {!isOpen && <span className="text-xl font-bold text-white">A</span>}
        </div>
        
        <nav className="space-y-1 mt-6">
          <NavItem to="/dashboard" icon={Home} label={isOpen ? "Dashboard" : ""} />
          <NavItem to="/dashboard/users" icon={Users} label={isOpen ? "Users" : ""} />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
