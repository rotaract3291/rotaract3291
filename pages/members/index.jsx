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
import { MEMBERS_API } from '../../components/urls';

export default Index;

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

function Index() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(MEMBERS_API + '/members');
        axios.get(MEMBERS_API + '/members')
            .then(x => {
                    //debugger;
                    for(let i = 0; i < x.data.length ; i++) {
                        users.push(x.data[i])
                    }
                    setLoading(false)
                }
            );
    }, []);

    useEffect(() => {
        console.log(users);
    }, [users]);

    
    const classes = useStyles();

    return (
        <div>
            <br />
            <br />
                <Link href='/members/add'>
                    <Button color="inherit">Add Member</Button>
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
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">RI ID</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                {row.id}
                                </TableCell>
                                <TableCell align="right">{row.full_name}</TableCell>
                                <TableCell align="right">{row.ri_id}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.phone}</TableCell>
                                <TableCell align="right">
                                    <Link href={`/members/edit/${encodeURIComponent(row.id)}`}>
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



