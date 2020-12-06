import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

export default function Chips({ updateSearchText }) {
    const classes = useStyles();


    const handleClick = (e) => {
        switch (e.currentTarget.innerText.substring(2)) {
            case 'Weapons':
                updateSearchText('weapon gun ammo bullet assault rifle smg');
                break;
            case 'Porn':
                updateSearchText('porn girls cute petit p3do pedo adult teen child young');
                break;
            case 'Bitcoin':
                updateSearchText('Bitcoin money wallet market coin');
                break;
            case 'Links':
                updateSearchText('link .onion http .com');
                break;
            case 'Credit Cards':
                updateSearchText('CC credit card visa master debit money');
                break;
            case 'Accounts':
                updateSearchText('account user password gmail.com hotmail.com application signup login profile');
                break;
        }
    };

    return (
        <div className={classes.root} style={{ marginTop: '15px' }}>
            <Chip
                avatar={<Avatar>#</Avatar>}
                label="Weapons"
                clickable
                color="primary"
                onClick={handleClick}
            />
            <Chip
                avatar={<Avatar>#</Avatar>}
                label="Porn"
                clickable
                color="primary"
                onClick={handleClick}
            />
            <Chip
                avatar={<Avatar>#</Avatar>}
                label="Bitcoin"
                clickable
                color="primary"
                onClick={handleClick}
            />
            <Chip
                avatar={<Avatar>#</Avatar>}
                label="Links"
                clickable
                color="primary"
                onClick={handleClick}
            />
            <Chip
                avatar={<Avatar>#</Avatar>}
                label="Credit Cards"
                clickable
                color="primary"
                onClick={handleClick}
            />
            <Chip
                avatar={<Avatar>#</Avatar>}
                label="Accounts"
                clickable
                color="primary"
                onClick={handleClick}
            />

        </div>
    );
}