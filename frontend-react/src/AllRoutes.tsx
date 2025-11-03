import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import _layout from "./_layout";
import { AddUserForm, LoginForm } from "./components/userComponents";
import PrivateRoutes from "./utils/PrivateRoutes";
import {
  _TaskLayout,
  AddTask,
  ArchievedTasks,
  CompletedTasks,
  PendingTasks,
  Profile,
} from "./components/taskComponents";
import { PNF404 } from "./components/commonComponents";
const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<_layout />} />
        <Route path="/authentication" element={<_layout />} />
        <Route path="/signup" element={<AddUserForm />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard/:username" element={<_TaskLayout />}>
            <Route index element={<PendingTasks />} />
            <Route path="profile" element={<Profile />} />
            <Route path="newtask" element={<AddTask />} />
            <Route path="pending" element={<PendingTasks />} />
            <Route path="completed" element={<CompletedTasks />} />
            <Route path="archieved" element={<ArchievedTasks />} />
          </Route>
        </Route>
        <Route path="/*" element={<PNF404 />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
