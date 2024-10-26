import useMenuStore from "@/store/useMenuStore";

export function useMatchRoutes(key: string): MenuItem | undefined {
  const menuItems = useMenuStore((state) => state.menus);
  const menuItem = menuItems.find(x=>x.meta.key === key);
  return menuItem;
}
