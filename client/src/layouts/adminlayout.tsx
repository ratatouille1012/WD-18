import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Loading from "../theme/loading";
import { useLoading } from "../contexts/loading";
import Sidebar from "../components/admin/sidebar";
import Header from "../components/admin/header";

function AdminLayout() {
  const { loading } = useLoading();

  return (
    <>
      <Loading isShow={loading} />
      <Stack direction={"row"} gap={2}>
        <div className="flex h-screen w-screen overflow-y-auto ">
        <Sidebar/>
        <div className="w-full  h-screen overflow-y-auto">
            <Header/>
            <Outlet />
        </div>
        </div>
      </Stack>
    </>
  );
}

export default AdminLayout;
