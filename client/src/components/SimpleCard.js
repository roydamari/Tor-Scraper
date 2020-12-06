import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import SnackbarAlert from './Snackbar';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        margin: 'auto',
        marginTop: '10px',
        marginBottom: '10px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function SimpleCard({ title, content, user, date }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(content)
        handleClick()
    };

    return (
        <>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {user[0].toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" onClick={copyToClipboard}>
                            <FileCopyOutlinedIcon />
                        </IconButton>
                    }
                    title={user}
                    subheader={date}
                />

                <CardContent>
                    <Typography variant="body2" color="textPrimary" component="p">
                        {title}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>

                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph style={{ wordBreak: 'break-all' }}>{content}</Typography>
                    </CardContent>
                </Collapse>
            </Card>
            <SnackbarAlert open={open} handleClose={handleClose} />
        </>
    );
}