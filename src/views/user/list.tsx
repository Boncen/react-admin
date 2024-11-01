import { UseRouter } from "@/hooks/useRouter";

export function UserList() {
  const { push } = UseRouter();
  function goDetail(): void {
    push("userDetail99", { id: 666 });
  }

  return (
    <div>
      UserList
      {/* <Link to={"/system/user/1234"}>用户详情</Link> */}
      <div onClick={goDetail}>去用户详情</div>
    </div>
  );
}
