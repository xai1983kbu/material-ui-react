import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import logo from '../../assets/logo.svg'

function ElevationScroll (props) {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  })
}
const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em'
    }
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('md')]: {
      height: '7em'
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em'
    }
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      background: 'transparent'
    }
  },
  tabContainer: {
    marginLeft: 'auto'
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 0,
    marginLeft: '25px'
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px'
  },
  menu: {
    backgroundColor: theme.palette.common.arcBlue,
    color: 'white',
    borderRadius: '0px'
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1
    }
  },
  draweIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  drawerIcon: {
    height: '50px',
    width: '50px'
  }
}))

export default function Header (props) {
  const classes = useStyles()
  const theme = useTheme()
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const [openDrawer, setOpenDrawer] = useState(false)
  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openMenu, setOpenMenu] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleClose = e => {
    setAnchorEl(null)
    setOpenMenu(false)
  }

  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  const handleClick = e => {
    setAnchorEl(e.currentTarget)
    setOpenMenu(true)
  }

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null)
    setOpenMenu(false)
    setSelectedIndex(i)
  }

  const menuOptions = [
    { name: 'Services', link: '/services' },
    { name: 'Custom Software Development', link: '/customsoftware' },
    { name: 'Mobile Development', link: '/mobileapps' },
    { name: 'Website Development', link: '/websites' }
  ]

  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        if (value !== 0) {
          setValue(0)
        }
        break
      case '/services':
        if (value !== 1) {
          setValue(1)
          setSelectedIndex(0)
        }
        break
      case '/customsoftware':
        if (value !== 1) {
          setValue(1)
          setSelectedIndex(1)
        }
        break
      case '/mobileapps':
        if (value !== 1) {
          setValue(1)
          setSelectedIndex(2)
        }
        break
      case '/websites':
        if (value !== 1) {
          setValue(1)
          setSelectedIndex(3)
        }
        break
      case '/revolution':
        if (value !== 2) {
          setValue(2)
        }
        break
      case '/about':
        if (value !== 3) {
          setValue(3)
        }
        break
      case '/contact':
        if (value !== 4) {
          setValue(4)
        }
        break
      case '/estimate':
        if (value !== false) {
          setValue(false)
        }
        break
      default:
        break
    }
  }, [value])

  const tabs = (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor='primary'
      >
        <Tab className={classes.tab} component={Link} to='/' label='Home' />
        <Tab
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup={anchorEl ? 'true' : undefined}
          className={classes.tab}
          component={Link}
          onMouseOver={event => handleClick(event)}
          to='/services'
          label='Services'
        />
        <Tab
          className={classes.tab}
          component={Link}
          to='/revolution'
          label='The Revolution'
        />
        <Tab
          className={classes.tab}
          component={Link}
          to='/about'
          label='About us'
        />
        <Tab
          className={classes.tab}
          component={Link}
          to='/contact'
          label='Contact Us'
        />
      </Tabs>
      <Button
        variant='contained'
        color='secondary'
        className={classes.button}
        component={Link}
        to='/estimate'
        onClick={() => {
          setValue(false)
        }}
      >
        Free estimate
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        open={openMenu}
        keepMounted
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={option.link}
            onClick={(e, index) => {
              handleMenuItemClick(e, index)
              setValue(index)
              handleClose()
            }}
            selected={index === selectedIndex && value === 1}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  )

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        Example Drawer
      </SwipeableDrawer>
      <IconButton
        className={classes.draweIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  )

  return (
    <>
      <ElevationScroll>
        <AppBar position='fixed' color='primary'>
          <Toolbar disableGutters>
            <Button
              className={classes.logoContainer}
              disableRipple
              component={Link}
              to='/'
              onClick={() => setValue(0)}
            >
              <img alt='company logo' className={classes.logo} src={logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* div below is just putting aliitle invisible cushion underneath our app bar and making sure that our content is being pushed out below it*/}
      <div className={classes.toolbarMargin} />
    </>
  )
}
