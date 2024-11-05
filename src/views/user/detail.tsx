import { MultiTabContext } from "@/layout/multitabs/multiTabContext";
import { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export function UserDetail() {
  const params = useParams();
  const location = useLocation();
//   console.log(params, location);

  const context = useContext(MultiTabContext);

  useEffect(() => {
    if (location.state?._title && context.setTabTitle) {
      context.setTabTitle(location.state._title);
    }
  }, []);

  return <div>UserDetail: {params.id} <input name="aaa" className="bg-slate-300" /></div>;
}
