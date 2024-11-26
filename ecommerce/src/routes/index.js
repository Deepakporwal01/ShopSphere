import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Home from '../pages/Home';
const router = createBrowserRouter(
    [{
        path :"/",
        element:<App/>,
        childern :[
            {
             path:"",
             element:<Home/>,
        },

        {
            path:"login",
            element: <Login/>,
       },


        ]
    }
    ]
)
export default router;