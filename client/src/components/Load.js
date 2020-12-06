import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100vw',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export default function Load() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress style={{ margin: 'auto', marginTop: '20px' }} />
        </div>
    );
}