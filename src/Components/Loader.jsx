// @flow weak

import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styleSheet = theme => ({
  btnContainer: {
    justifyContent: 'center',
    width: "100%",
    alignItems: 'center',
    display: 'flex',
  },
  primaryColor: {
    color: '#9752ff'
  }
})

function Loader (props) {
  const {classes} = props

 return (
    <div className={classes.btnContainer}>
      <CircularProgress size={40} classes={{colorPrimary: classes.primaryColor}} color={'primary'} />
    </div>
  )
}

export default withStyles(styleSheet)(Loader)