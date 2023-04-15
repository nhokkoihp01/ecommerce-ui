import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {NotificationContainer} from "react-notifications";

import {publicRoutes} from "~/routes";
import DefaultLayout from "~/layouts/DefaultLayout";
import AuthService from "~/services/auth/AuthService";
import config from "~/config";

function App() {
  return (
      <Router>
          <div className="App">
              <NotificationContainer />
              <Routes>
                  {publicRoutes.map((route, index) => {
                      const Page = withTokenExpiredRedirect(route.component);
                      let Layout = DefaultLayout;
                      if (route.layout) {
                          Layout = route.layout;
                      } else if (route.layout === null) {
                          Layout = Fragment;
                      }
                      return (
                          <Route
                              key={index}
                              path={route.path}
                              element={<Layout><Page /></Layout>}
                          />
                      );
                  })}
              </Routes>
          </div>
      </Router>
  );
}
function withTokenExpiredRedirect(Component) {
    return function TokenExpiredRedirect(props) {
        const navigate = useNavigate();
        const location = useLocation();

        React.useEffect(() => {
            if (location.pathname !== "/" && location.pathname !== config.routes.home && location.pathname !== config.routes.register) {
                const intervalId = setInterval(() => {
                    if (AuthService.isTokenExpired()) {
                        localStorage.removeItem('token');
                        navigate(config.routes.login);
                    }
                }, 1000);

                return () => clearInterval(intervalId);
            }

        }, [navigate, location]);

        return <Component {...props} />;
    };
}

export default App;
