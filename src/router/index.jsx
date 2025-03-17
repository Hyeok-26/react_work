import { createHashRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Post from "../pages/Post";
import UserDetail from "../pages/UserDetail";
import ProtectedRoute from "../components/ProtectedRoute";
import UserUpdateForm from "../pages/UserUpdateForm";
import UserPwdUpdateForm from "../pages/UserPwdUpdateForm";
import PostForm from "../pages/PostForm";
import PostDetail from "../pages/PostDetail";

const routes=[
    {path:"/index.html", element:<Home/>},
    {path:"/", element:<Home/>},
    {path:"/posts", element:<Post/> },
    {path:"/user/detail", element:<ProtectedRoute><UserDetail/></ProtectedRoute>},
    {path:"/user/edit", element:<ProtectedRoute><UserUpdateForm/></ProtectedRoute>},
    {path:"/user/password/edit", element:<ProtectedRoute><UserPwdUpdateForm/></ProtectedRoute>},
    {path:"/posts/new", element:<ProtectedRoute><PostForm/></ProtectedRoute>},
    {path:"posts/:num", element:<PostDetail/>}

];

//export 해줄 router 객체 만든다
const router = createHashRouter([{
    path:"/",
    element:<App/>,
    children: routes.map((route)=>{
        return {
            index: route.path === "/", //자식의 path 가 "/" 면 index 페이지 역활을 하게 하기 
            path: route.path === "/" ? undefined : route.path, // path 에 "/" 두개가 표시되지 않게  
            element: route.element //어떤 컴포넌트를 활성화 할것인지 
        }
    })
}]);
 export default router;