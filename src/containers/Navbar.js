import React from "react";
import { Link } from "react-router-dom";
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import {Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';
import { WithNamespaces, withNamespaces } from "react-i18next";
import { Language } from "@material-ui/icons";
import { IconButton, AppBar, Menu, MenuItem } from "@material-ui/core";
import { switchLanguage } from "../actions/Setting";
import { signOutUser } from "../actions/Auth";
import { connect } from "react-redux";
import { AuthState } from "../reducers/authReducer";

const styles = (theme: Theme) =>
createStyles({
  appMainHeader: {
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    width: "100%",
    display: "flex",
    zIndex: 1100,
    boxSizing: "border-box",
    flexShrink: 0,
    flexDirection: "column",
    top: 0,
    /*left: auto,
    right: 0,*/
    position: "fixed"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

interface Props extends WithStyles<typeof styles>, WithNamespaces {
  auth: AuthState;
  switchLanguage: typeof switchLanguage;
  signOut: typeof signOutUser;
}

interface State {
  langMenuAnchorEl?: any;
}

class Navbar extends React.PureComponent<Props, State> {
  state = {
    langMenuAnchorEl: null
  };

  handleLangMenuOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.setState({ langMenuAnchorEl: event.currentTarget });
  };

  handleChangeLanguage = (lng: string) => {
    console.info("Changing language to", lng);
    this.props.switchLanguage(lng);
    this.handleLangMenuClose();
  };

  handleLangMenuClose = () => {
    this.setState({ langMenuAnchorEl: null });
  };

  render() {
    const { langMenuAnchorEl } = this.state;
    const { auth, classes, t, lng } = this.props;
    const isLangMenuOpen = Boolean(langMenuAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={langMenuAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isLangMenuOpen}
        onClose={this.handleLangMenuClose}
      >
        <MenuItem style={{ direction: "ltr" }} onClick={() => this.handleChangeLanguage("en")}>
          English
        </MenuItem>
        <MenuItem style={{ direction: "ltr" }} onClick={() => this.handleChangeLanguage("id")}>
          Bahasa Indonesia
        </MenuItem>
        <MenuItem style={{ direction: "ltr" }} onClick={() => this.handleChangeLanguage("ms")}>
          Malay
        </MenuItem>
        <MenuItem style={{ direction: "ltr" }} onClick={() => this.handleChangeLanguage("zh-CN")}>
          简化字
        </MenuItem>
        <MenuItem className="rtl" onClick={() => this.handleChangeLanguage("ar")}>
          العَرَبِيَّة‎
        </MenuItem>
      </Menu>
    );

    return (
      <div className="app-header">
        <AppBar position="static" className={classes.appMainHeader + " mui-fixed app-main-header"}>
          <Toolbar className="app-toolbar">
            <Typography
              variant="h6"
              color="textPrimary"
              className={classes.grow}
            >
              <Link className="text-white" to="/" title="Heartenly">
                <img src="/images/heartenly-128.png" alt="Heartenly" style={{ width: '2em' }} />
                <span className="d-none d-sm-inline ml-2">Heartenly</span>
              </Link>
            </Typography>
            {!auth.isAuthenticated && <Button color="inherit">
              <Link className="text-white nav-link" to="/">
                {t("sign_up")}
              </Link>
            </Button>}
            {!auth.isAuthenticated && <Button color="inherit">
              <Link className="text-white nav-link" to="/signin">
                {t("sign_in")}
              </Link>
            </Button>}
            {auth.isAuthenticated &&
              <Button color="inherit" className="text-white" onClick={this.props.signOut}>
                {t("sign_out")}
              </Button>}
            {auth.isAuthenticated && auth.user!.name}
            <IconButton
              aria-owns={isLangMenuOpen ? "material-appbar" : undefined}
              aria-haspopup="true"
              onClick={this.handleLangMenuOpen}
              color="inherit"
              style={{ fontWeight: 500, fontSize: "0.875rem" }}
            >
              <Language className="mr-1" />
              {lng ? lng.toUpperCase() : ""}
            </IconButton>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }: any) => ({ auth });

export default connect(
  mapStateToProps,
  { switchLanguage, signOut: signOutUser }
)(withNamespaces()(withStyles(styles)(Navbar)));
