import { Breadcrumb } from "@douyinfe/semi-ui";
import { useMatches } from "react-router-dom";

export function Breadcrumbs() {
  const matches = useMatches();
  console.log("matches", matches);

  const crumbs = matches
    .filter((match: any) => Boolean(match.handle?.crumb))
    .map((match: any) => match.handle.crumb(match.data));

  return (
    <div className="flex items-center">
      <Breadcrumb
        showTooltip={{ opts: { position: "bottom" } }}
        routes={["首页", "当这个页面标题很长时需要省略", "上一页", "详情页"]}
      />
    </div>

    // todo 路由缺少meta信息
    // <ol>
    //   {crumbs.map((crumb, index) => (
    //     <li key={index}>{crumb}</li>
    //   ))}
    // </ol>
  );
}
