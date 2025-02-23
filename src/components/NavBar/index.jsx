/**
 * NavBar component.
 *
 * Shows global top navigation bar with all apps menu, logo and user menu.
 */
import React, {
  useState,
  useCallback,
  Fragment,
  useEffect,
  useMemo,
} from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import UserMenu from "../UserMenu";
import AllAppsMenu from "../AllAppsMenu";
import { useSelector } from "react-redux";
import { Link, useLocation } from "@reach/router";
import TCLogo from "../../assets/images/tc-logo.svg";
import { getLoginUrl } from "../../utils";
import "./styles.css";
import { useMediaQuery } from "react-responsive";
import NotificationsMenu from "../NotificationsMenu";

const NavBar = ({ hideSwitchTools }) => {
  // all menu options
  const menu = useSelector((state) => state.menu.categories);
  // flat list of all apps
  const apps = useMemo(() => _.flatMap(menu, "apps"), [menu]);
  // Active app
  const [activeApp, setActiveApp] = useState(null);
  const auth = useSelector((state) => state.auth);
  const isMobile = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  const routerLocation = useLocation();
  // Check app title with route activated
  useEffect(() => {
    const activeApp = apps.find(
      (f) => routerLocation.pathname.indexOf(f.path) !== -1
    );
    setActiveApp(activeApp);
  }, [routerLocation]);

  // Change micro-app callback
  const changeApp = useCallback(
    (app) => {
      setActiveApp(app);
    },
    [setActiveApp]
  );

  const renderTopcoderLogo = hideSwitchTools ? (
    <img src={TCLogo} alt="Topcoder Logo" />
  ) : (
    <Link to="/">
      <img src={TCLogo} alt="Topcoder Logo" />
    </Link>
  );

  return (
    <div className="navbar">
      <div className="navbar-left">
        {isMobile ? (
          hideSwitchTools ? null : (
            <AllAppsMenu />
          )
        ) : (
          <Fragment>
            {renderTopcoderLogo}
            <div className="navbar-divider"></div>
            <div className="navbar-app-title">
              {activeApp ? activeApp.title : ""}
            </div>
          </Fragment>
        )}
      </div>

      <div className="navbar-center">
        {isMobile ? renderTopcoderLogo : <Fragment></Fragment>}
        {process.env.NODE_ENV === "test" && (
          <h3 style={{ display: "none" }}>Navbar App Test</h3>
        )}
      </div>

      <div className="navbar-right">
        {isMobile ? (
          <Fragment>
            {auth.isInitialized &&
              (auth.tokenV3 ? (
                auth.profile && (
                  <Fragment>
                    {hideSwitchTools ? null : <NotificationsMenu />}
                    <UserMenu
                      profile={auth.profile}
                      hideSwitchTools={hideSwitchTools}
                    />
                  </Fragment>
                )
              ) : (
                <a href={getLoginUrl()} className="navbar-login">
                  Login
                </a>
              ))}
          </Fragment>
        ) : (
          <Fragment>
            {hideSwitchTools ? null : <AllAppsMenu appChange={changeApp} />}
            <div className="navbar-divider"></div>
            {auth.isInitialized &&
              (auth.tokenV3 ? (
                auth.profile && (
                  <Fragment>
                    {hideSwitchTools ? null : <NotificationsMenu />}
                    <UserMenu
                      profile={auth.profile}
                      hideSwitchTools={hideSwitchTools}
                    />
                  </Fragment>
                )
              ) : (
                <a href={getLoginUrl()} className="navbar-login">
                  Login
                </a>
              ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

NavBar.defaultProps = {
  hideSwitchTools: false,
};

NavBar.propTypes = {
  hideSwitchTools: PropTypes.boolean,
};

export default NavBar;
