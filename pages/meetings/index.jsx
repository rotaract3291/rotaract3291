import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MEETINGS_API } from '../../components/urls';

export default Index;

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

function Index() {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //debugger;
        axios.get(MEETINGS_API + '/meetings')
            .then(x => {
                    for(let i = 0; i < x.data.length ; i++) {
                        meetings.push(x.data[i]);
                    }
                    setLoading(false)
                }
            );
    }, []);

    useEffect(() => {
        //debugger;
        console.log(meetings);
    }, [meetings]);
    
    const classes = useStyles();

    return (
        <div>
            <br />
            <br />
                <Link href='/meetings/add'>
                    <Button color="inherit">Add Meeting</Button>
                </Link>
            <br />
            <br />
            {
                (loading) ? '' :
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Club</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Venue</TableCell>
                                <TableCell align="right">Members</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {meetings.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                    {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.club}</TableCell>
                                    <TableCell align="right">{row.meeting_type}</TableCell>
                                    <TableCell align="right">{row.venue}</TableCell>
                                    <TableCell align="right">{(Array.isArray(row.members)) ? row.members.length : row.members}</TableCell>
                                    <TableCell align="right">
                                        <Link href={`/meetings/edit/${encodeURIComponent(row.id)}`}>
                                            <a><EditIcon /></a>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
  );
}



