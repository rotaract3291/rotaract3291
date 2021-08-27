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
import { Link as LinkIcon } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { PROJECTS_API } from '../../components/urls';

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
        console.log(PROJECTS_API + '/projects');
        axios.get(PROJECTS_API + '/projects')
            .then(x => {
                    debugger;
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
                <Link href='/projects/add'>
                    <Button color="inherit">Add Project</Button>
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
                            <TableCell align="right">Avenue</TableCell>
                            <TableCell align="right">Project Type</TableCell>
                            <TableCell align="right">Start Date</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Media</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                {row.id}
                                </TableCell>
                                <TableCell align="right">{row.project_name}</TableCell>
                                <TableCell align="right">{row.avenue}</TableCell>
                                <TableCell align="right">{row.project_type}</TableCell>
                                <TableCell align="right">{row.start}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">
                                    <a href={row.media} rel="noreferrer" target="_blank"><LinkIcon /></a>
                                </TableCell>
                                <TableCell align="right">
                                    <Link href={`/projects/edit/${encodeURIComponent(row.id)}`}>
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



